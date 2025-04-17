import { Document } from "mongoose";
import { UserRole } from "../../type/user.type";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;

  // Optional fields for tutors
  bio?: string;
  subjects?: string[];
  availability?: {
    day: string;
    timeSlots: string[]; // e.g., ['10:00-11:00', '14:00-15:00']
  }[];

  ratings?: number[]; // used to calculate average rating
  earnings?: number; // for tutors

  createdAt?: Date;
  updatedAt?: Date;
}
