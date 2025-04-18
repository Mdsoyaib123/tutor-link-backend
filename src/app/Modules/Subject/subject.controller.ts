import { Request, Response } from "express";
import { createSubjectSchema } from "./subject.validation";
import { subjectService } from "./subject.services";
import sendResponse from "../../utilis/sendResponse";

const createSubject = async (req: Request, res: Response) => {
  const result = await subjectService.createSubject(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subject created successfully",
    data: result,
  });
};

const getAllSubjects = async (_req: Request, res: Response) => {
  const result = await subjectService.getAllSubjects();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Get successfully",
    data: result,
  });
};

const updateSubject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await subjectService.updateSubject(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subject updated successfully",
    data: result,
  });
};

const deleteSubject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await subjectService.deleteSubject(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subject deleted successfully",
    data: result,
  });
};
export const subjectController = {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
};
