import { NavLink } from "react-router-dom";
import logo from "../assets/mobx_preto.png";

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white shadow-md p-6 fixed top-0 left-0">
      <img src={logo} alt="MOBX" className="w-32 h-auto mb-6 mx-auto" />

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
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          👤 Clientes
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }
        >
          ⚙️ Perfil
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;
