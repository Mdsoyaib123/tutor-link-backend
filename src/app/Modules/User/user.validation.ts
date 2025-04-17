import { z } from "zod";
import mongoose from "mongoose";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "tutor"], {
    required_error: "Role is required and must be 'student' or 'tutor'",
  }),

  // Optional tutor fields
  bio: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  availability: z
    .array(
      z.object({
        day: z.string(),
        timeSlots: z.array(z.string()),
      })
    )
    .optional(),

  ratings: z.array(z.number()).optional(),
  earnings: z.number().optional(),

  // Optional student fields
  interactedTutors: z
    .array(
      z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid tutor ID in interactedTutors",
      })
    )
    .optional(),

  lastBookingDate: z.coerce.date().optional(),
});

export const userValidationSchema ={
    createUserSchema
}
