import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the Title"],
    maxLength: [50, "Name should be under 50 Characters"],
    trim: true,
  },
  days: {
    type: [String],
    enum: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    required: true,
  },
  duration: {
    start_Date: {
      type: Date,
      required: true,
    },
    end_Date: {
      type: Date,
      required: true,
    },
  },
  tasks: [
    {
      task: {
        title: {
          type: String,
          required: true,
          maxLength: [50, "Name should be under 50 Characters"],
          trim: true,
        },
        status: { type: Boolean, default: true },
      },
    },
  ],

  weekendCounter: {
    type: Number,
    default: 0,
  },
  editGoal: {
    type: Boolean,
    default: true,
  },
  counter: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  goalStatus: { type: Boolean, default: false },
});

export default mongoose.model("Goal", goalSchema);
