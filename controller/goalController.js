import User from "../model/user.js";
import BigPromise from "../middleware/BigPromise.js";
import CustomError from "../util/customError.js";
import cookieToken from "../util/cookieToken.js";
import Goal from "../model/goal.js";

//create goal
export const createGoal = async (req, res, next) => {
  try {
    console.log("creating");
    const { title, days, startDate, endDate, tasks } = req.body;

    if (!req.user) {
      throw new CustomError("User is not logged in", 400);
    }

    // Create an array of task objects
    const taskObjects = tasks.map((task) => ({
      task: {
        title: task.title,
        currentStatus: false,
        prevStatus: false,
      },
    }));

    // Create a new goal
    const goal = await Goal.create({
      title,
      days: [...days],
      duration: {
        start_Date: startDate,
        end_Date: endDate,
      },
      tasks: taskObjects,
      user: req.user, // Assuming req.user contains the logged-in user's information
    });

    res.status(201).json({
      status: "success",
      goal,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Goal
export const deleteGoal = BigPromise(async (req, res, next) => {
  const goalID = req.params.id;
  const findGoal = await Goal.findById({ _id: goalID });

  if (!findGoal) {
    return res.status(400).send({ msg: `Goal not found with id : ${goalID}` });
  }

  await Goal.findByIdAndDelete({ _id: goalID });
  res.status(200).send({ msg: "Goal deleted success" });
});

//Get All goals
export const getAllGoals = BigPromise(async (req, res, next) => {
  if (!req.user) {
    throw new CustomError("User is not logged in", 400);
  }
  const allGoals = await Goal.find({ user: req.user._id });
  if (allGoals.lenght < 1) {
    throw new CustomError("Goal is not created yet", 400);
  }
  res.status(200).send({ status: "success", allGoals });
});

//Get Single goals
export const getSingleGoal = BigPromise(async (req, res, next) => {
  const goalID = req.params.id;

  if (!req.user) {
    throw new CustomError("User is not logged in", 400);
  }

  const goal = await Goal.findById({ _id: goalID });

  if (!goal) {
    return res.status(400).send({ msg: `Goal not found with id : ${goalID}` });
  }

  res.status(200).send({ status: "success", goal });
});

// Update goal
export const editGoal = BigPromise(async (req, res, next) => {
    const { title, days, startDate, endDate, tasks } = req.body;
    const goalID = req.params.id;
  
    if (!req.user) {
      throw new CustomError("User is not logged in", 400);
    }
  
    // Create an array of task objects
    const taskObjects = tasks.map((task) => ({
      task: {
        title: task.title,
        currentStatus: false,
        prevStatus: false,
      },
    }));
  
    const updateGoal = {
      title,
      days: [...days],
      duration: {
        start_Date: startDate,
        end_Date: endDate,
      },
      tasks: taskObjects,
      user: req.user, // Assuming req.user contains the logged-in user's information
      editGoal: false,
    };
  
    const goal = await Goal.findOneAndUpdate({ _id: goalID }, updateGoal, {
      new: true,
      runValidators: true,
    });
  
    if (!goal) {
      return res.status(400).send({ msg: `Goal not found with id: ${goalID}` });
    }
  
    res.status(200).send({ status: "success", goal });
  });

  export const updateTaskStatus = async (req, res) => {
    try {
      const { goalId, taskId, newStatus } = req.body; // Assuming the goalId, taskId, and newStatus are provided in the request body
  
      // Find the goal document and update the task status
      const updatedGoal = await Goal.findOneAndUpdate(
        { _id: goalId, "tasks._id": taskId },
        { $set: { "tasks.$.task.status": newStatus } },
        { new: true }
      );
  
      if (!updatedGoal) {
        return res.status(404).json({ error: "Goal or task not found" });
      }
  
      return res.status(200).json(updatedGoal);
    } catch (error) {
      console.error("Error updating task status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
