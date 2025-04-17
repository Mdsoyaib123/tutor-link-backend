import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateTime: Date,
  duration: Number,
  price: Number,
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
