import { Types } from "mongoose";

export interface IBooking {
  _id?: Types.ObjectId;
  student: Types.ObjectId;
  tutorId: Types.ObjectId;
  dateTime: Date;
  duration: number;
  price: number;
  status: "pending" | "completed" | "canceled";
}
