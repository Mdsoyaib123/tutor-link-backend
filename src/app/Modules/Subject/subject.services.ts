import { ISubject } from "./subject.interface";
import { Subject } from "./subject.model";

export const createSubject = async (payload: ISubject) => {
  return await Subject.create(payload);
};

export const getAllSubjects = async () => {
  return await Subject.find();
};
export const updateSubject = async (id: string, payload: Partial<ISubject>) => {
  return await Subject.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteSubject = async (id: string) => {
  return await Subject.findByIdAndDelete(id);
};
export const subjectService = {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
};
