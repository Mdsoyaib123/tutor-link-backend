import { ObjectId } from "mongoose";
import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";

const createBooking = async (
  studentId: string,
  { tutorId, dateTime, duration, price }: IBooking
) => {
  const booking = await Booking.create({
    student: studentId,
    tutor: tutorId,
    dateTime,
    duration,
    price,
  });
  return booking;
};

export const updateBookingStatus = async (
  bookingId: string,
  status: string
) => {
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );
  return booking;
};

export const bookingServices = {
  createBooking,
  updateBookingStatus,
};
