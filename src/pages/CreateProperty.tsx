import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase/config";
import { addProperty } from "../services/propertyService";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeftCircle } from "lucide-react";

function CreateProperty() {
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("disponível");
    const [area, setArea] = useState("");
    const [rooms, setRooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [garage, setGarage] = useState("");
    const [type, setType] = useState("Casa");
    const [iptu, setIptu] = useState("");
    const [condoFee, setCondoFee] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        await addProperty({
            title,
            address,
            price,
            status,
            area,
            rooms,
            bathrooms,
            garage,
            type,
            iptu,
            condoFee,
            description,
            userId: user.uid,
        });

        navigate("/properties");
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-6 w-full min-h-screen bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-700">
                        <Home className="w-6 h-6" /> Novo Imóvel
                    </h1>
                    <button
                        onClick={() => navigate("/properties")}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                        <ArrowLeftCircle className="w-4 h-4" /> Voltar
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow max-w-4xl mx-auto grid gap-6"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-3 border rounded w-full focus:ring-2 focus:ring-blue-300"
                                placeholder="Ex: Casa com quintal"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="p-3 border rounded w-full"
                                placeholder="Rua, número, bairro"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="p-3 border rounded w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="p-3 border rounded w-full"
                            >
                                <option value="disponível">Disponível</option>
                                <option value="reservado">Reservado</option>
                                <option value="vendido">Vendido</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de imóvel</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="p-3 border rounded w-full"
                            >
                                <option>Casa</option>
                                <option>Apartamento</option>
                                <option>Sobrado</option>
                                <option>Kitnet</option>
                                <option>Studio</option>
                                <option>Cobertura</option>
                                <option>Terreno</option>
                                <option>Galpão</option>
                                <option>Loja</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Área (m²)" className="p-3 border rounded w-full" />
                        <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder="Quartos" className="p-3 border rounded w-full" />
                        <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="Banheiros" className="p-3 border rounded w-full" />
                        <input type="number" value={garage} onChange={(e) => setGarage(e.target.value)} placeholder="Vagas garagem" className="p-3 border rounded w-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <input type="number" value={iptu} onChange={(e) => setIptu(e.target.value)} placeholder="Valor IPTU (R$)" className="p-3 border rounded w-full" />
                        <input type="number" value={condoFee} onChange={(e) => setCondoFee(e.target.value)} placeholder="Condomínio (R$)" className="p-3 border rounded w-full" />
                    </div>

                    <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Inclua detalhes como localização, vantagens, mobiliado, etc..."
                            className="p-3 border rounded w-full h-32"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg"
                        >
                            Salvar imóvel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProperty;
