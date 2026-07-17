import { useState } from "react";
import { updateTask, deleteTask } from "../services/taskService";

function TaskCard({ task, refreshTasks }) {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateTask(task._id, form);

      alert("Task Updated");

      setEditing(false);

      refreshTasks();
    } catch (err) {
      alert("Update Failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(task._id);

      alert("Task Deleted");

      refreshTasks();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  if (editing) {
    return (
      <div style={{ border: "1px solid gray", padding: "15px", margin: "15px" }}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <br /><br />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <br /><br />

        <button onClick={handleUpdate}>
          Save
        </button>

        <button
          onClick={() => setEditing(false)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "15px",
        borderRadius: "10px",
      }}
    >
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>Status: {task.status}</p>

      <p>Priority: {task.priority}</p>

      <button onClick={() => setEditing(true)}>
        Edit
      </button>

      <button
        onClick={handleDelete}
        style={{
          marginLeft: "10px",
          background: "red",
          color: "white",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;