import { useEffect, useState } from "react";

export default function Stats() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const progress = total === 0 ? 0 : (done / total) * 100;

  const statsByCategory = {};
  const statsByPriority = {};

  tasks.forEach((t) => {
    statsByCategory[t.category] = (statsByCategory[t.category] || 0) + 1;
    statsByPriority[t.priority] = (statsByPriority[t.priority] || 0) + 1;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Stats</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Overall progress</h3>
          <div className="text-3xl font-bold">{Math.round(progress)}%</div>
          <div className="text-sm text-gray-600">
            {done} / {total} tasks done
          </div>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded">
            <div
              className="h-full bg-green-600 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">By category</h3>
          <ul className="space-y-1 text-sm">
            {Object.entries(statsByCategory).map(([cat, count]) => (
              <li key={cat}>
                {cat}: {count}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">By priority</h3>
          <ul className="space-y-1 text-sm">
            {Object.entries(statsByPriority).map(([prio, count]) => (
              <li key={prio}>
                {prio}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}