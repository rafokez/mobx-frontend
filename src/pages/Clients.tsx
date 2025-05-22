import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  purpose: string;
  userId: string;
  createdAt: any;
}

function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filtered, setFiltered] = useState<Client[]>([]);
  const [filterText, setFilterText] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    const fetchClients = async () => {
      if (!user) return;
      const q = query(collection(db, "clients"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const result: Client[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Client));
      setClients(result);
      setFiltered(result);
    };

    fetchClients();
  }, [user]);

  useEffect(() => {
    const filteredData = clients.filter((client) => {
      const matchesText =
        client.name.toLowerCase().includes(filterText.toLowerCase()) ||
        client.address.toLowerCase().includes(filterText.toLowerCase());
      const matchesPurpose = purposeFilter ? client.purpose === purposeFilter : true;
      return matchesText && matchesPurpose;
    });
    setFiltered(filteredData);
  }, [filterText, purposeFilter, clients]);

  const insights = {
    total: clients.length,
    compra: clients.filter((c) => c.purpose === "compra").length,
    venda: clients.filter((c) => c.purpose === "venda").length,
    locacao: clients.filter((c) => c.purpose === "locacao").length,
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Clientes</h1>
        

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded shadow p-4">
            <p className="text-gray-600 text-sm">Total de clientes</p>
            <h2 className="text-xl font-bold">{insights.total}</h2>
          </div>
          <div className="bg-white rounded shadow p-4">
            <p className="text-gray-600 text-sm">Interessados em compra</p>
            <h2 className="text-xl font-bold text-green-600">{insights.compra}</h2>
          </div>
          <div className="bg-white rounded shadow p-4">
            <p className="text-gray-600 text-sm">Desejam vender</p>
            <h2 className="text-xl font-bold text-blue-600">{insights.venda}</h2>
          </div>
          <div className="bg-white rounded shadow p-4">
            <p className="text-gray-600 text-sm">Buscam aluguel</p>
            <h2 className="text-xl font-bold text-yellow-600">{insights.locacao}</h2>
          </div>
        </div>

        <button
            onClick={() => navigate("/create-client")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Cadastrar Cliente
                    </button>

        {/* Filtros */}
        <div className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Filtrar por nome, endereço, bairro..."
            className="p-2 border rounded w-full md:w-1/2"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <select
            className="p-2 border rounded w-full md:w-1/4"
            value={purposeFilter}
            onChange={(e) => setPurposeFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="compra">Compra</option>
            <option value="venda">Venda</option>
            <option value="locacao">Locação</option>
          </select>
        </div>

        {/* Lista de clientes */}
        <div className="bg-white rounded shadow p-4">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-4 py-2">Nome</th>
                <th className="text-left px-4 py-2">Telefone</th>
                <th className="text-left px-4 py-2">Endereço</th>
                <th className="text-left px-4 py-2">Objetivo</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="px-4 py-2">{client.name}</td>
                  <td className="px-4 py-2">{client.phone}</td>
                  <td className="px-4 py-2">{client.address}</td>
                  <td className="px-4 py-2 capitalize">{client.purpose}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Clients;
