import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-700 text-white p-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Productivity Tracker</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Tasks
          </Link>
          <Link to="/stats" className="hover:underline">
            Stats
          </Link>
        </div>
      </div>
    </nav>
  );
}