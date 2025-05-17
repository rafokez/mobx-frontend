import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth, db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Visit {
    id: string;
    userId: string;
    propertyId: string;
    clientName: string;
    phone: string;
    dateTime: string;
}

interface Property {
    id: string;
    userId: string;
    title: string;
    address?: string;
    price?: number;
    status?: string;
}

function Visits() {
    const [visits, setVisits] = useState<any[]>([]);
    const [properties, setProperties] = useState<any[]>([]);

    const user = auth.currentUser;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) return;

            console.log("Usuário autenticado:", currentUser.uid);

            const visitQuery = query(
                collection(db, "visits"),
                where("userId", "==", currentUser.uid)
            );
            const visitSnap = await getDocs(visitQuery);

            const propertyQuery = query(
                collection(db, "properties"),
                where("userId", "==", currentUser.uid)
            );
            const propertySnap = await getDocs(propertyQuery);

            const visitData = visitSnap.docs.map((doc) => ({
                ...(doc.data() as Visit),
                id: doc.id,
            }));

            const propertyData = propertySnap.docs.map((doc) => ({
                ...(doc.data() as Property),
                id: doc.id,
            }));

            setVisits(visitData);
            setProperties(propertyData);
        });

        return () => unsubscribe();
    }, []);

    const thisWeek = visits.filter((v) => {
        const now = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 7);
        const dt = new Date(v.dateTime);
        return dt >= now && dt <= end;
    });

    const futureVisits = visits.filter((v) => new Date(v.dateTime) > new Date());

    const visitsPerProperty = properties.map((prop) => ({
        title: prop.title,
        count: visits.filter((v) => v.propertyId === prop.id).length,
    }));

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Painel de Visitas</h1>

                {/* Insights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-md text-gray-600 mb-2">Visitas da semana</h2>
                        <p className="text-3xl font-bold text-blue-600">{thisWeek.length}</p>
                    </div>
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-md text-gray-600 mb-2">Visitas futuras</h2>
                        <p className="text-3xl font-bold text-green-600">{futureVisits.length}</p>
                    </div>
                    <div className="bg-white rounded shadow p-4">
                        <h2 className="text-md text-gray-600 mb-2">Total de visitas</h2>
                        <p className="text-3xl font-bold text-purple-600">{visits.length}</p>
                    </div>
                </div>

                {/* Ranking por imóvel */}
                <div className="bg-white rounded shadow p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Visitas por Imóvel</h2>
                    <ul className="space-y-2">
                        {visitsPerProperty.map((v) => (
                            <li key={v.title} className="flex justify-between">
                                <span>{v.title}</span>
                                <span className="font-semibold">{v.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Lista de visitas */}
                <div className="bg-white rounded shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Próximas Visitas</h2>
                    <ul className="space-y-3">
                        {futureVisits.map((v) => {
                            const prop = properties.find((p) => p.id === v.propertyId);
                            return (
                                <li key={v.id} className="border rounded p-3">
                                    <p>
                                        <strong>{v.clientName}</strong> - {v.phone}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(v.dateTime).toLocaleString()} –{" "}
                                        <span className="italic">{prop?.title}</span>
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Visits;
