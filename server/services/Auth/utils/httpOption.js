// Render sets NODE_ENV=production automatically. Cross-site cookies in prod
// require secure + sameSite=none. Over plain http://localhost in dev, those
// flags prevent the cookie from being stored, so relax them.
const isProd = process.env.NODE_ENV === "production";

const baseOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  path: "/",
};

const ONE_DAY = 24 * 60 * 60 * 1000;

const accessCookieOptions = {
  ...baseOptions,
  maxAge: ONE_DAY, // matches ACCESS_TOKEN_EXPIRES_IN=1d
};

const refreshCookieOptions = {
  ...baseOptions,
  maxAge: 15 * ONE_DAY, // matches REFRESH_TOKEN_EXPIRES_IN=15d
};

export {
  baseOptions as options, // for clearCookie
  accessCookieOptions,
  refreshCookieOptions,
};
