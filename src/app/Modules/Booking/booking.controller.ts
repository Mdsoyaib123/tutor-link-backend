import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

// Create a new booking request
const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingServices.createBooking(req.user._id, req.body);
    res.json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update booking status (e.g., pending -> completed, canceled)
const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const booking = await bookingServices.updateBookingStatus(
      req.body.bookingId,
      req.body.status
    );
    res.json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mark booking as paid after payment success
const markBookingPaid = async (req: Request, res: Response) => {
  try {
    const booking = await bookingServices.markBookingPaid(
      req.body.bookingId,
      req.body.amount
    );
    res.json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings for a student (dashboard)
const getBookingsForUser = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingServices.getBookingsForUser(req.user._id);
    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings for a tutor (dashboard)
const getBookingsForTutor = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingServices.getBookingsForTutor(req.user._id);
    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const bookingControllers = {
  createBooking,
  updateBookingStatus,
  markBookingPaid,
  getBookingsForUser,
  getBookingsForTutor,
};
