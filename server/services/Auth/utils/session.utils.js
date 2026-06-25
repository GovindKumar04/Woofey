import crypto from "crypto";
import jwt from "jsonwebtoken";
import { redis } from "../services/config/redis.js";

// 15 days, in seconds — the refresh token / session lifetime.
const REFRESH_TTL_SECONDS = Number(
  process.env.REFRESH_TTL_SECONDS || 15 * 24 * 60 * 60,
);

const sessionKey = (jti) => `sess:${jti}`;
const userSessionsKey = (userId) => `user_sessions:${userId}`;

const signRefreshToken = (user, jti) =>
  jwt.sign({ user_id: user.user_id, jti }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TTL_SECONDS,
  });

export const createSession = async (user, meta = {}) => {
  const jti = crypto.randomUUID();
  const refreshToken = signRefreshToken(user, jti);

  const payload = JSON.stringify({
    user_id: user.user_id,
    createdAt: Date.now(),
    ...meta,
  });

  await redis
    .multi()
    .set(sessionKey(jti), payload, "EX", REFRESH_TTL_SECONDS)
    .sadd(userSessionsKey(user.user_id), jti)
    .expire(userSessionsKey(user.user_id), REFRESH_TTL_SECONDS)
    .exec();

  return { refreshToken, jti };
};

export const getSession = async (jti) => {
  const raw = await redis.get(sessionKey(jti));
  return raw ? JSON.parse(raw) : null;
};

export const deleteSession = async (jti, userId) => {
  await redis
    .multi()
    .del(sessionKey(jti))
    .srem(userSessionsKey(userId), jti)
    .exec();
};

// Revoke every session for a user (logout-all / password change / ban).
export const deleteAllSessions = async (userId) => {
  const jtis = await redis.smembers(userSessionsKey(userId));
  const pipeline = redis.multi();
  for (const jti of jtis) pipeline.del(sessionKey(jti));
  pipeline.del(userSessionsKey(userId));
  await pipeline.exec();
};

// Rotate on refresh: kill the old session, mint a fresh one (theft-resistant).
export const rotateSession = async (oldJti, user, meta = {}) => {
  await deleteSession(oldJti, user.user_id);
  return createSession(user, meta);
};
