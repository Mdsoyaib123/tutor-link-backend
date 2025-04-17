import { User } from "../User/user.model";
import { Booking } from "./booking.model";
// Assuming User model includes tutors
import mongoose from "mongoose";

const createBooking = async (studentId: string, data: any) => {
  const { tutorId, date, time, duration, subject, hourlyRate } = data;

  const totalPrice = duration * hourlyRate;

  const booking = new Booking({
    student: studentId,
    tutor: tutorId,
    subject,
    date,
    time,
    duration,
    hourlyRate,
    totalPrice,
    status: "pending",
    isPaid: false,
  });

  await booking.save();
  return booking;
};

const updateBookingStatus = async (bookingId: string, status: string) => {
  const validStatuses = ["pending", "confirmed", "completed", "canceled"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );

  if (!booking) throw new Error("Booking not found");

  // OPTIONAL: update student if tutor accepted
  if (status === "confirmed") {
    await User.findByIdAndUpdate(booking.student, {
      $addToSet: { interactedTutors: booking.tutor }, // custom field (Array)
      $set: { lastBookingDate: new Date() },
    });
  }

  return booking;
};

const markBookingPaid = async (bookingId: string, amount: number) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  if (booking.totalAmount !== amount) {
    throw new Error("Payment amount mismatch");
  }

  if (booking.isPaid) {
    throw new Error("Booking already marked as paid");
  }

  // Update booking status
  booking.isPaid = true;
  booking.status = "paid";
  await booking.save();

  // Update tutor's earnings
  await User.findByIdAndUpdate(booking.tutor, {
    $inc: { earnings: amount },
  });

  return booking;
};

const getBookingsForUser = async (studentId: string) => {
  const bookings = await Booking.find({ student: studentId })
    .populate("tutor", "name subjects")
    .sort({ createdAt: -1 });

  return bookings;
};

const getBookingsForTutor = async (tutorId: string) => {
  const bookings = await Booking.find({ tutor: tutorId })
    .populate("student", "name email")
    .sort({ createdAt: -1 });

  return bookings;
};

export const bookingServices = {
  createBooking,
  updateBookingStatus,
  markBookingPaid,
  getBookingsForUser,
  getBookingsForTutor,
};
