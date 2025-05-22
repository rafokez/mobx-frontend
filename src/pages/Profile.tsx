import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  status: string;
}

function Properties() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
    } else {
      setUserEmail(user.email);
      fetchProperties(user.uid);
    }
  }, []);

  const fetchProperties = async (uid: string) => {
    const q = query(collection(db, "properties"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    const result: Property[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Property[];
    setProperties(result);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">🏠 Imóveis</h1>

        {userEmail && (
          <p className="text-gray-600 mb-4">
            Usuário logado: <strong>{userEmail}</strong>
          </p>
        )}

        <div className="bg-white p-6 rounded shadow">
          {properties.length === 0 ? (
            <p className="text-gray-500">Nenhum imóvel cadastrado.</p>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Título</th>
                  <th className="text-left px-4 py-2">Endereço</th>
                  <th className="text-left px-4 py-2">Preço</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="px-4 py-2">{p.title}</td>
                    <td className="px-4 py-2">{p.address}</td>
                    <td className="px-4 py-2">R$ {p.price}</td>
                    <td className="px-4 py-2 capitalize">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Properties;
