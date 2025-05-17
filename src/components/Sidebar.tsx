import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white shadow-md p-6 fixed top-0 left-0">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">MOBX</h1>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          📊 Dashboard
        </NavLink>
        <NavLink
          to="/properties"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          🏠 Imóveis
        </NavLink>
        <NavLink
          to="/visits"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          📅 Visitas
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
