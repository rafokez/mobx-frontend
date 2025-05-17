import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/config";
import { listenToProperties, deleteProperty, updateProperty } from "../services/propertyService";
import { useNavigate } from "react-router-dom";

function Properties() {
    const [properties, setProperties] = useState<any[]>([]);
    const [editId, setEditId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});
    const navigate = useNavigate();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const unsubscribe = listenToProperties(user.uid, setProperties);
            return () => unsubscribe();
        }
    }, [user]);

    const mostVisited = properties[0]; // Substituir por lógica real de visitas

    const insights = {
        disponiveis: properties.filter((p) => p.status === "disponível").length,
        reservados: properties.filter((p) => p.status === "reservado").length,
        vendidos: properties.filter((p) => p.status === "vendido").length,
        total: properties.length,
    };

    const openEditModal = (property: any) => {
        setEditId(property.id);
        setEditData({ ...property });
    };

    const handleUpdate = async () => {
        if (!editId) return;
        await updateProperty(editId, editData);
        setEditId(null);
        setEditData({});
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Imóveis</h1>
                    <button
                        onClick={() => navigate("/create-property")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Criar Imóvel
                    </button>
                </div>

                {/* Insights */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white shadow rounded p-4">
                        <p className="text-gray-600 text-sm">Total de imóveis</p>
                        <h2 className="text-xl font-bold">{insights.total}</h2>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <p className="text-gray-600 text-sm">Disponíveis</p>
                        <h2 className="text-xl font-bold text-green-600">{insights.disponiveis}</h2>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <p className="text-gray-600 text-sm">Reservados</p>
                        <h2 className="text-xl font-bold text-yellow-600">{insights.reservados}</h2>
                    </div>
                    <div className="bg-white shadow rounded p-4">
                        <p className="text-gray-600 text-sm">Vendidos</p>
                        <h2 className="text-xl font-bold text-red-600">{insights.vendidos}</h2>
                    </div>
                </div>

                {/* Lista de imóveis */}
                <div className="bg-white shadow rounded overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left px-4 py-2">Título</th>
                                <th className="text-left px-4 py-2">Endereço</th>
                                <th className="text-left px-4 py-2">Preço</th>
                                <th className="text-left px-4 py-2">Status</th>
                                <th className="text-left px-4 py-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((p) => (
                                <tr key={p.id} className="border-b">
                                    <td className="px-4 py-2">{p.title}</td>
                                    <td className="px-4 py-2">{p.address}</td>
                                    <td className="px-4 py-2">R$ {p.price}</td>
                                    <td className="px-4 py-2 capitalize">{p.status}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="text-green-600 hover:underline text-sm"
                                            onClick={() => navigate(`/properties/${p.id}`)}
                                        >
                                            Ver detalhes
                                        </button>
                                        <button
                                            className="text-blue-600 hover:underline text-sm"
                                            onClick={() => openEditModal(p)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="text-red-600 hover:underline text-sm"
                                            onClick={() => deleteProperty(p.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {properties.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center p-4 text-gray-500">
                                        Nenhum imóvel cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {editId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                            <h2 className="text-xl font-bold mb-4">Editar Imóvel</h2>

                            <div className="grid gap-3">
                                <input type="text" placeholder="Título" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="p-2 border rounded" />
                                <input type="text" placeholder="Endereço" value={editData.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} className="p-2 border rounded" />
                                <input type="number" placeholder="Preço" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} className="p-2 border rounded" />
                                <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })} className="p-2 border rounded">
                                    <option value="disponível">Disponível</option>
                                    <option value="reservado">Reservado</option>
                                    <option value="vendido">Vendido</option>
                                </select>
                                <input type="number" placeholder="Área (m²)" value={editData.area} onChange={(e) => setEditData({ ...editData, area: e.target.value })} className="p-2 border rounded" />
                                <input type="number" placeholder="Quartos" value={editData.rooms} onChange={(e) => setEditData({ ...editData, rooms: e.target.value })} className="p-2 border rounded" />
                                <input type="number" placeholder="Banheiros" value={editData.bathrooms} onChange={(e) => setEditData({ ...editData, bathrooms: e.target.value })} className="p-2 border rounded" />
                                <input type="number" placeholder="Garagem" value={editData.garage} onChange={(e) => setEditData({ ...editData, garage: e.target.value })} className="p-2 border rounded" />
                                <input type="text" placeholder="Tipo de imóvel" value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value })} className="p-2 border rounded" />
                                <input type="number" placeholder="IPTU" value={editData.iptu} onChange={(e) => setEditData({ ...editData, iptu: e.target.value })} className="p-2 border rounded" />
                                <input type="number" placeholder="Condomínio" value={editData.condoFee} onChange={(e) => setEditData({ ...editData, condoFee: e.target.value })} className="p-2 border rounded" />
                                <textarea placeholder="Descrição" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="p-2 border rounded h-24" />
                            </div>

                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => setEditId(null)} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
                                <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Properties;
