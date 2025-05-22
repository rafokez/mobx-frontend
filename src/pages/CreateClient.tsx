import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { db, auth } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

function CreateClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("compra");

  const user = auth.currentUser;

  const messageTemplates = {
    compra: `Olá ${name}, tudo bem? Vi que você tem interesse em comprar um imóvel. Podemos agendar uma visita ou conversar melhor?`,
    venda: `Olá ${name}, tudo bem? Gostaria de entender melhor sobre o imóvel que deseja vender. Podemos conversar?`,
    locacao: `Olá ${name}, tudo bem? Vi que você está buscando um imóvel para alugar. Podemos conversar melhor?`
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(messageTemplates[purpose as keyof typeof messageTemplates]);
    const number = phone.replace(/\D/g, "");
    window.open(`https://wa.me/55${number}?text=${text}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await addDoc(collection(db, "clients"), {
      name,
      phone,
      address,
      purpose,
      userId: user.uid,
      createdAt: new Date()
    });

    setName("");
    setPhone("");
    setAddress("");
    setPurpose("compra");
    alert("Cliente cadastrado com sucesso!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Cliente</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 max-w-xl">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome e Sobrenome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border rounded w-full"
              placeholder="Ex: João da Silva"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone (com DDD)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 border rounded w-full"
              placeholder="Ex: 11999999999"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço atual</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="p-3 border rounded w-full"
              placeholder="Rua, número, bairro, cidade"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo do cliente</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="p-3 border rounded w-full"
            >
              <option value="compra">Comprar imóvel</option>
              <option value="venda">Vender imóvel</option>
              <option value="locacao">Alugar imóvel</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Mandar mensagem no WhatsApp
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateClient;
