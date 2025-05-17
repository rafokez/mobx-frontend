import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Importa aqui

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
    } else {
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo principal com margem à esquerda */}
      <div className="ml-64 p-6 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Painel - MOBX</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Sair
          </button>
        </div>

        <p className="mb-6 text-gray-700">
          Bem-vindo, <strong>{userEmail}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Visitas hoje</h2>
            <p className="text-3xl font-bold text-blue-600">5</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Imóveis cadastrados</h2>
            <p className="text-3xl font-bold text-green-600">12</p>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Leads recebidos</h2>
            <p className="text-3xl font-bold text-purple-600">8</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
