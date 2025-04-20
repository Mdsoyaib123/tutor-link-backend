

// import { StatusCodes } from "http-status-codes";
import { IRequest } from "./permitTutor.interface";
import permitTutor from "./permitTutor.mode";


const sendPermitService = async (payload: IRequest) => {
  const tutorId=payload.tutorId

   // Find if any request already exists for this tutorId
   const isSubjectExists = await permitTutor.find({ tutorId });

   // Check if the array is not empty
   if (isSubjectExists.length > 0) {
    //  throw new AppError(StatusCodes.NOT_FOUND, "You already sent request!");
   }
    // const user = await User.isUserExistsByCustomId(userData?.email);
  
        const result = await permitTutor.create(payload);
        console.log("result=",result)
        return result;
  
 }
const getALLPermitsFromDB = async () => {
      const result  = permitTutor.find().populate('tutorId')
      return result;
}

    const getPermitsForTutor = async (tutorId: string) => {
      const requests = await permitTutor.find({ tutorId }).exec();
      return requests;
    };

    const getPermitsForStudent = async (userEmail: string) => {
      try {
        const requests = await permitTutor.find({ userEmail }).populate('tutorId');
        // console.log(requests, "email");
        return requests;
      } catch (error) {
        console.error("Error fetching requests:", error);
        throw new Error("Failed to fetch requests for the student.");
      }
    };
    const updatePermitByTutor = async (requestId: string, updateData: Partial<IRequest>) => {
      try {
        const updatedRequest = await permitTutor.findByIdAndUpdate(
          requestId,
          updateData,
          { new: true } // Returns the updated document
        );
    
        if (!updatedRequest) {
          // throw new AppError(StatusCodes.NOT_FOUND, "Request not found");
        }
    
        return updatedRequest;
      } catch (error) {
        // throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to update request");
        console.log(error);
      }
    };
    
  

export const permitServices = {
    sendPermitService,
    getPermitsForTutor,
    getPermitsForStudent,
    getALLPermitsFromDB,updatePermitByTutor
}