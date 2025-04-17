import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingServices.createBooking(req.user._id, req.body);
    res.json(booking);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

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

export const bookingControllers = {
  createBooking,
  updateBookingStatus,
};
