import { createTraining,getAllTrainings,getTraining,updateTraining,deleteTraining } from "../controllers/trainingController.js";
import { Router } from "express";
import { validateTrainingInput,validateIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const router=Router();

router.route('/').get(getAllTrainings).post(checkForTestUser,validateTrainingInput,createTraining);
router.route('/:id').get(validateIdParam,getTraining).patch(checkForTestUser,validateTrainingInput,updateTraining).delete(validateIdParam,checkForTestUser,deleteTraining);
export default router;