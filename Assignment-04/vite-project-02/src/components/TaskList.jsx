import { useState } from "react";

export default function TaskList({ tasks, onToggle, onDelete }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  const getPriorityWeight = (p) =>
    p === "high" ? 3 : p === "medium" ? 2 : 1;

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "done") return t.done;
    if (filter === "undone") return !t.done;

    return t.category === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "priority")
      return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    if (sortBy === "category") return a.category.localeCompare(b.category);

    return 0;
  });

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div className="flex flex-wrap gap-4 mb-4 justify-between">
        <div className="min-w-48">
          <label className="block text-sm font-medium mb-1">Filter</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="undone">Not Done</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <div className="min-w-48">
          <label className="block text-sm font-medium mb-1">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="title">Title</option>
            <option value="priority">Priority</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-2">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 border rounded ${
                task.done ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => onToggle(task.id)}
                  className="w-5 h-5 rounded accent-indigo-600"
                />
                <div>
                  <span
                    className={`font-medium ${
                      task.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  <div className="text-sm text-gray-500">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                    {" | "}
                    {task.category}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-800 text-xs px-2 py-1"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}