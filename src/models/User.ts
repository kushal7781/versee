import { Schema, model, models, Model, type Document } from "mongoose";

/**
 * WHY THIS SHAPE
 * ---------------
 * - `role` drives our role-based authorization (user vs admin) instead of
 *   maintaining a separate permissions table — simple and sufficient for
 *   this app's needs.
 * - `password` is optional because we'll also support OAuth providers via
 *   Auth.js later, and OAuth users won't have a local password.
 * - `wishlist` and `savedBuilds` are stored as ObjectId references rather
 *   than embedded documents, because products/builds are large, frequently
 *   updated, and reused across many users — embedding would duplicate data
 *   and make updates inconsistent.
 */

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "user" | "admin";
  wishlist: Schema.Types.ObjectId[];
  savedBuilds: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, select: false }, // select:false = never returned by default queries
    image: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    savedBuilds: [{ type: Schema.Types.ObjectId, ref: "Build" }],
  },
  { timestamps: true }
);

// Note: `unique: true` on the email field above already creates this index,
// so no separate userSchema.index() call is needed here.

// `models.User` check prevents Mongoose from redefining the model on every
// hot reload in development, which would throw an OverwriteModelError.
export const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);
