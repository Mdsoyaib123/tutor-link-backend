import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "paid", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  isPaid: { type: Boolean },
});

export const Booking = mongoose.model("Booking", bookingSchema);
