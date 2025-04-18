
import { IUser } from "./user.interface";
import { User } from "./user.model";

 const createUser = async (userData: IUser): Promise<IUser> => {
  const result = (await User.create(userData))
  return result.populate("subjects")
}

 const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find().populate("subjects");
};

 const getSingleUser = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).populate("subjects");
};

 const updateUser = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, payload, { new: true }).populate("subjects");
};

 const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};


export const userService ={
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}