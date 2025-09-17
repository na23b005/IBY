import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const API_URL = "http://localhost:4000/task";

function formatToLocalDatetime(deadline) {
  const date = new Date(deadline);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [email, setEmail] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Create Task
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/create`, {
        title,
        deadline,
        email,
      });
      setMessage(res.data.message);
      setTitle("");
      setDeadline("");
      setEmail("");
      fetchTasks();
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  // Update Task
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/${editingTaskId}`, {
        title,
        deadline,
        email,
      });
      setMessage(res.data.message);
      setEditingTaskId(null);
      setTitle("");
      setDeadline("");
      setEmail("");
      fetchTasks();
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Edit Task (fill form inside the card)
  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDeadline(formatToLocalDatetime(task.deadline)); // Local datetime for edit input
    setEmail(task.email);
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditingTaskId(null);
    setTitle("");
    setDeadline("");
    setEmail("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#191a1a] via-[#222223] to-[#302f30] text-white flex flex-col items-center p-6 ">
      <h1 className="text-5xl font-bold mt-30">Task Manager</h1>

      {/* Create Task Form */}
      <form
        onSubmit={handleCreate}
        className="bg-black/60 rounded-2xl p-6 mt-8 w-full max-w-xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Create New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-3 rounded-lg text-white bg-[#303030] placeholder:text-gray-400"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="p-3 rounded-lg text-white bg-[#303030] placeholder:text-gray-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-lg text-white bg-[#303030] placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-bl from-[#303030] to-gray-700 font-semibold shadow-lg hover:bg-none hover:bg-gray-700"
        >
          <FaPlus />
          Create Task
        </button>
      </form>

      {message && <p className="mt-4 text-gray-400">{message}</p>}

      {/* Task List */}
      <h2 className="text-3xl font-bold mt-12">📌 Your Tasks</h2>
      <div className="grid gap-6 mt-6 w-full max-w-4xl">
        {tasks.length === 0 && (
          <p className="text-gray-300">No tasks found. Create one above.</p>
        )}

        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-black/60 rounded-2xl p-5 shadow-md hover:scale-105 hover:bg-black/80 transition duration-300"
          >
            {editingTaskId === task._id ? (
              // Inline edit form
              <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 rounded text-white placeholder:text-gray-500"
                />
                <input
                  type="datetime-local"
                  value={deadline} // Controlled by state to be editable
                  onChange={(e) => setDeadline(e.target.value)}
                  className="p-2 rounded text-white placeholder:text-gray-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 rounded text-white placeholder:text-gray-500"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-green-600 hover:bg-green-700"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Normal view
              <>
                <p className="text-xl font-semibold">{task.title}</p>
                <p className="mt-1 text-gray-300">
                  Deadline:{" "}
                  {new Date(task.deadline).toLocaleString([], {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <p className="text-gray-400">Email: {task.email}</p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleEdit(task)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
