import express from "express";
import { isLoggedIn } from "../middleware/user.js";
import {
  createGoal,
  deleteGoal,
  getAllGoals,
  getSingleGoal,
  editGoal,
  updateTaskStatus,
} from "../controller/goalController.js";
const router = express.Router();

router.route("/create/task").post(isLoggedIn, createGoal);
router.route("/delete/goal/:id").delete(isLoggedIn, deleteGoal);
router.route("/get/allgoal").get(isLoggedIn, getAllGoals);
router.route("/update/status/task").post(isLoggedIn, updateTaskStatus);
router
  .route("/goal/:id")
  .get(isLoggedIn, getSingleGoal)
  .put(isLoggedIn, editGoal);

export default router;
