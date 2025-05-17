import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { addVisit } from "../services/visitService";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "properties", id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProperty({ id: docSnap.id, ...docSnap.data() });
      } else {
        navigate("/properties");
      }
    };
    fetchData();
  }, [id]);

  const handleSchedule = async () => {
    if (!auth.currentUser || !property) return;

    await addVisit({
      clientName,
      phone,
      dateTime,
      propertyId: property.id,
      userId: auth.currentUser.uid,
    });

    setClientName("");
    setPhone("");
    setDateTime("");
    setShowModal(false);
  };

  if (!property) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="ml-64 p-6">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Detalhes do Imóvel</h1>

        <div className="bg-white p-6 rounded shadow space-y-4 max-w-xl">
          <div>
            <strong className="block text-gray-600">Título:</strong>
            <p>{property.title}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Endereço:</strong>
            <p>{property.address}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Preço:</strong>
            <p>R$ {property.price}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Status:</strong>
            <p className="capitalize">{property.status}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Área:</strong>
            <p>{property.area} m²</p>
          </div>
          <div>
            <strong className="block text-gray-600">Tipo:</strong>
            <p>{property.type}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Quartos:</strong>
            <p>{property.rooms}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Banheiros:</strong>
            <p>{property.bathrooms}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Garagem:</strong>
            <p>{property.garage}</p>
          </div>
          <div>
            <strong className="block text-gray-600">IPTU:</strong>
            <p>R$ {property.iptu}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Condomínio:</strong>
            <p>R$ {property.condoFee}</p>
          </div>
          <div>
            <strong className="block text-gray-600">Descrição:</strong>
            <p>{property.description}</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agendar Visita
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Nova Visita</h2>

              <input
                type="text"
                placeholder="Nome do cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSchedule}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyDetails;
