
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData)
  return result
}


export const userService ={
  createUser
}