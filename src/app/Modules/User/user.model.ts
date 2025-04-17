import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "tutor"],
      required: true,
    },

    // Only for tutors
    bio: { type: String },
    subjects: [{ type: String }],
    availability: [
      {
        day: String,
        timeSlots: [String], // flexible availability per day
      },
    ],
    ratings: [{ type: Number }],
    earnings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
