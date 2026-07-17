import { useState } from "react";
import { createTask } from "../services/taskService";

function AddTask({ refreshTasks }) {
  const [showForm, setShowForm] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask(task);

      alert("Task Added Successfully");

      setTask({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
      });

      setShowForm(false);

      refreshTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to Add Task");
    }
  };

  return (
    <>
      <button onClick={() => setShowForm(true)}>
        + Add Task
      </button>

      {showForm && (
        <div style={{ marginTop: "20px" }}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={task.title}
              onChange={handleChange}
              required
            />

            <br /><br />

            <textarea
              name="description"
              placeholder="Description"
              value={task.description}
              onChange={handleChange}
            />

            <br /><br />

            <select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>In-Progress</option>
              <option>Completed</option>
            </select>

            <br /><br />

            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <br /><br />

            <button type="submit">
              Save Task
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AddTask;