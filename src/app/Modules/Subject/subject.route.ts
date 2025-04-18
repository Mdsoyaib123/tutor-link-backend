import express from "express";
import { subjectController } from "./subject.controller";
import validateRequest from "../../middlewares/validateRequest";
import { subjectValidation } from "./subject.validation";

const router = express.Router();

router.post("/create-subject",validateRequest(subjectValidation.createSubjectSchema), subjectController.createSubject);
router.get("/get-all-subject", subjectController.getAllSubjects);
router.patch("/update/:id", subjectController.updateSubject);
router.delete("/delete/:id", subjectController.deleteSubject);

export const subjectRoutes = router;
