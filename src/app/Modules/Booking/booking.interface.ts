import { Types } from "mongoose";

export interface IBooking {
  student: Types.ObjectId;
  tutor: Types.ObjectId;
  subject: string;
  date: Date;
  hours: number;
  hourlyRate: number;
  totalAmount?: number;
  status?:
    | "pending"
    | "accepted"
    | "rejected"
    | "paid"
    | "completed"
    | "cancelled";
  createdAt?: Date;
  isPaid: boolean;
}
