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
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    availability: [
      {
        day: String,
        timeSlots: [String], // flexible availability per day
      },
    ],
    ratings: [{ type: Number }],
    earnings: { type: Number, default: 0 },
    // NEW student-specific tracking fields
    interactedTutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastBookingDate: { type: Date },
  },
  { timestamps: true }
);


export const User = mongoose.model<IUser>("User", userSchema);
