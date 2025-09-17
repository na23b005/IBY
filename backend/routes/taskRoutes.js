import express from "express";
import Task from "../models/Task.js";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();

// ✅ Create Task
router.post("/create", async (req, res) => {
  try {
    const { title, deadline, email } = req.body;
    const deadlineDate = new Date(deadline);

    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ error: "Invalid deadline format (use ISO DateTime)" });
    }

    const task = await Task.create({ title, deadline: deadlineDate, email });
    scheduleReminders(task);
    res.json({ message: "Task created with reminders", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ deadline: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Task
router.put("/:id", async (req, res) => {
  try {
    const { title, deadline, email } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, deadline, email },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    // Reschedule reminders
    scheduleReminders(updatedTask);
    res.json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test email route
router.get("/test-mail", async (req, res) => {
  try {
    const success = await sendMail(
      "pianoking636@gmail.com",
      "Postman Test Email",
      "This is a test email triggered from Postman"
    );

    if (success) {
      return res.json({ message: "✅ Test email sent, check your inbox!" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Helper to schedule reminders
// function scheduleReminders(task) {
//   const { title, deadline, email } = task;
//   const deadlineTime = new Date(deadline).getTime();
//   const now = Date.now();

//   // 10 mins before
//   if (deadlineTime - now > 10 * 60 * 1000) {
//     setTimeout(() => {
//       sendMail(email, "Reminder: Task Deadline Approaching", `Your task "${title}" is due in 10 minutes!`);
//     }, deadlineTime - now - 10 * 60 * 1000);
//   }

//   // 1 min before
//   if (deadlineTime - now > 1 * 60 * 1000) {
//     setTimeout(() => {
//       sendMail(email, "Urgent Reminder: Task Deadline", `Your task "${title}" is due in 1 minute!`);
//     }, deadlineTime - now - 1 * 60 * 1000);
//   }
// }

// export default router;

// Map to track active timers for each task
const activeTimers = new Map();

function scheduleReminders(task) {
  const { _id, title, deadline, email } = task;
  const deadlineTime = new Date(deadline).getTime();
  const now = Date.now();

  // Clear any existing timers for this task
  if (activeTimers.has(_id)) {
    activeTimers.get(_id).forEach(clearTimeout);
  }

  const timers = [];

  // 10 minutes before reminder
  if (deadlineTime - now > 10 * 60 * 1000) {
    const timer10min = setTimeout(() => {
      sendMail(email, "Reminder: Task Deadline Approaching", `Your task "${title}" is due in 10 minutes!`);
      // After firing, remove this timer ID from activeTimers
      removeTimer(_id, timer10min);
    }, deadlineTime - now - 10 * 60 * 1000);

    timers.push(timer10min);
  }

  // 1 minute before reminder
  if (deadlineTime - now > 1 * 60 * 1000) {
    const timer1min = setTimeout(() => {
      sendMail(email, "Urgent Reminder: Task Deadline", `Your task "${title}" is due in 1 minute!`);
      // After firing, remove this timer ID from activeTimers
      removeTimer(_id, timer1min);
    }, deadlineTime - now - 1 * 60 * 1000);

    timers.push(timer1min);
  }

  // Save new timer IDs in the map
  activeTimers.set(_id, timers);
}

// Helper to remove fired timer from map
function removeTimer(taskId, timerId) {
  if (!activeTimers.has(taskId)) return;
  const timers = activeTimers.get(taskId).filter((id) => id !== timerId);
  if (timers.length === 0) {
    activeTimers.delete(taskId);
  } else {
    activeTimers.set(taskId, timers);
  }
}

export default router;