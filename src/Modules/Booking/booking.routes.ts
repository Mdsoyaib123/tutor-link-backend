import express from "express";
import { bookingControllers } from "./booking.controller";

// You can add authentication middleware if needed
// import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes here can be protected by middleware if needed
router.post("/", /* authenticate, */ bookingControllers.createBooking);
router.patch(
  "/status",
  /* authenticate, */ bookingControllers.updateBookingStatus
);

export default router;
