import { useState, useEffect } from "react";

function Dashboard() {

const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Low");

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ADD OR UPDATE TASK
  const addTask = () => {

    if (title === "") {
      alert("Enter Task Title");
      return;
    }

    if (editId) {

      const updated = tasks.map(task =>
        task.id === editId
          ? {
              ...task,
              title,
              description,
              status,
              priority
            }
          : task
      );

      setTasks(updated);
      setEditId(null);

    } else {

    const newTask = {
  id: Date.now(),
  title,
  description,
  status,
  priority,
  createdAt: new Date().toLocaleString()
};

      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Low");
  };

  // DELETE
const deleteTask = (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (confirmDelete) {
    setTasks(tasks.filter(task => task.id !== id));
  }

};

// CLEAR ALL TASKS
const clearAllTasks = () => {
  const confirmClear = window.confirm(
    "Are you sure you want to delete all tasks?"
  );

  if (confirmClear) {
    setTasks([]);
    localStorage.removeItem("tasks");
  }
};

  // EDIT
  const editTask = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
  };

  const generateSuggestion = () => {

  if (title.trim() === "") {
    alert("Enter a task title first");
    return;
  }

  let suggestion = "";

  if (title.toLowerCase().includes("react")) {
    suggestion =
      "Break this into small components and practice React Hooks first.";
  } else if (title.toLowerCase().includes("java")) {
    suggestion =
      "Practice coding problems and revise OOP concepts.";
  } else if (title.toLowerCase().includes("project")) {
    suggestion =
      "Complete the UI first, then backend, and finally test everything.";
  } else {
    suggestion =
      "Break the task into smaller steps and set a deadline.";
  }

  setAiSuggestion(suggestion);

setTimeout(() => {
    setAiSuggestion("");
}, 40000);
};

  // SEARCH
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
  const isLoggedIn = localStorage.getItem("token");

  const today = new Date().toLocaleDateString();

  return (
  <div className="dashboard">

    {/* Navbar */}
<div className="navbar">

  <div
    className="profile"
    onClick={() => window.location.href = "/profile"}
    style={{ cursor: "pointer" }}
  >

   <div className="avatar">
  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
</div>

    <div className="profile-info">
  <h3>{user?.name}</h3>
  <p>{user?.email}</p>
</div>

  </div>

  <button
    onClick={() => {
     localStorage.removeItem("token");
localStorage.removeItem("user");
window.location.href = "/";
    }}
  >
    Logout
  </button>

</div>

    {/* Welcome Card */}

    <div className="welcome-card">
      <h1>👋 Welcome {user?.name}</h1>
    </div>


      {/* STATS */}

      <div className="stats">

        <div className="stat-card">
          <h3>📋 Total</h3>
          <h2>{tasks.length}</h2>
        </div>

        <div className="stat-card">
          <h3>⏳ Pending</h3>
          <h2>{tasks.filter(t => t.status === "Pending").length}</h2>
        </div>

        <div className="stat-card">
          <h3>🚀 Progress</h3>
          <h2>{tasks.filter(t => t.status === "In-Progress").length}</h2>
        </div>

        <div className="stat-card">
          <h3>✅ Done</h3>
          <h2>{tasks.filter(t => t.status === "Completed").length}</h2>
        </div>

      </div>

      {/* TASK INPUT */}

      <div className="task-input">

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={addTask}>
          {editId ? "Update Task" : "+ Add Task"}
        </button>

        <button onClick={generateSuggestion}>
         ✨ AI Suggest
        </button>

      </div>

      {/* SEARCH */}

      <input
        className="search-box"
        placeholder="🔍 Search your tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="clear-btn" onClick={clearAllTasks}>
  🗑 Clear All Tasks
</button>

      {aiSuggestion && (
  <div className="ai-box">
    <h3>🤖 AI Suggestion</h3>
    <p>{aiSuggestion}</p>
  </div>
)}

     <h2>
      My Tasks ({filteredTasks.length})
     </h2>

      {/* TASKS */}

      <div className="task-list">

        {filteredTasks.length === 0 ? (

          <p>No Tasks Found</p>

        ) : (

          filteredTasks.map(task => (

            <div className="task-card" key={task.id}>

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p className="task-date">
                📅 {task.createdAt}
              </p>

              <span
                className={
                  task.status === "Completed"
                    ? "completed"
                    : task.status === "In-Progress"
                    ? "progress"
                    : "pending"
                }
              >
                {task.status}
              </span>

              <span
                className={
                  task.priority === "High"
                    ? "high"
                    : task.priority === "Medium"
                    ? "medium"
                    : "low"
                }
              >
                {task.priority}
              </span>

              <br />

              <button onClick={() => editTask(task)}>
  Edit
</button>
               
              <button onClick={() => deleteTask(task.id)}>
              Delete
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}


export default Dashboard;