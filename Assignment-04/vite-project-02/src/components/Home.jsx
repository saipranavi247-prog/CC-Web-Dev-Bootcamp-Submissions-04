import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Smart feature: pick a random task to focus
  const pickRandomTask = () => {
    const undone = tasks.filter((t) => !t.done);
    if (undone.length === 0) {
      alert("No undone tasks to focus on!");
      return;
    }
    const randomTask = undone[Math.floor(Math.random() * undone.length)];
    alert(
      `🎯 Focus on: "${randomTask.title}" (Priority: ${randomTask.priority})`
    );
  };

  const progressPercent =
    tasks.length === 0 ? 0 : (tasks.filter((t) => t.done).length / tasks.length) * 100;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="mb-2">
        <span className="text-sm text-gray-600">
          Progress: {Math.round(progressPercent)}%
        </span>
        <div className="mt-1 h-2 w-full bg-gray-200 rounded">
          <div
            className="h-full bg-indigo-600 rounded"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <button
        onClick={pickRandomTask}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
      >
        Pick a random task to focus
      </button>

      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleDone} onDelete={deleteTask} />
    </div>
  );
}