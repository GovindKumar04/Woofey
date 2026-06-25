import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { snowflake } from "../utils/user_id.utils.js";

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

const userSchema = new mongoose.Schema(
  {
    // Stable, app-generated id used across microservices (not Mongo's _id).
    user_id: {
      type: String,
      unique: true,
      immutable: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 70,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    phone_number: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },
    // Never returned by default; queries must opt in with .select("+password").
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Account lifecycle — login is rejected unless "active".
    status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    // Strip sensitive fields from any JSON response.
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Secondary indexes for the hot read paths at scale. (user_id/email/phone_number
// are already indexed via `unique: true`.)
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

// Assign a snowflake id on creation.
userSchema.pre("save", async function (next) {
  try {
    if (this.isNew && !this.user_id) {
      this.user_id = (await snowflake.generate()).toString();
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Hash password only when it changes.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Stateless access token — verified by signature alone (no DB/Redis hit).
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      user_id: this.user_id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" }
  );
};

const User = mongoose.model("User", userSchema);

export { User };
