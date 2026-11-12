import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Practice JavaScript", completed: true },
    { id: 3, title: "Build a project", completed: false }
  ]);

  const [taskName, setTaskName] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();

    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: taskName.trim(),
      completed: false
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskName("");
  };

  // Change task status
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Search and filter tasks
  const displayedTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !task.completed) ||
      (filter === "Completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <div className="task-container">

        <h1>Task Tracker</h1>
        <p>Manage your daily tasks easily.</p>

        {/* Add Task */}
        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        {/* Search */}
        <input
          type="text"
          className="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}
        <div className="filters">
          {["All", "Active", "Completed"].map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "active-filter" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="task-list">
          {displayedTasks.length === 0 ? (
            <p className="no-tasks">No tasks found.</p>
          ) : (
            displayedTasks.map((task) => (
              <div className="task" key={task.id}>
                <div>
                  <span className={task.completed ? "completed" : ""}>
                    {task.title}
                  </span>

                  <small>
                    {task.completed ? "Completed" : "Active"}
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
