import express from "express";
import { bookingControllers } from "./booking.controller";

// Optionally add authentication middleware
// import { authenticate } from "../middleware/auth";

const router = express.Router();

// Create a new booking (student initiates)
router.post("/", /* authenticate, */ bookingControllers.createBooking);

// Update booking status (tutor/admin)
router.patch(
  "/status",
  /* authenticate, */ bookingControllers.updateBookingStatus
);

// Mark booking as paid (after payment success)
router.post(
  "/mark-paid",
  /* authenticate, */ bookingControllers.markBookingPaid
);

// Get all bookings for a student (dashboard)
router.get(
  "/my-bookings",
  /* authenticate, */ bookingControllers.getBookingsForUser
);

// Get all bookings for a tutor (dashboard)
router.get(
  "/tutor-bookings",
  /* authenticate, */ bookingControllers.getBookingsForTutor
);

export default router;
