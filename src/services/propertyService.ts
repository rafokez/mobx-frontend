import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

// Adicionar novo imóvel
export async function addProperty(data: any) {
  await addDoc(collection(db, "properties"), data);
}

// Observar imóveis em tempo real (filtrando por usuário, se quiser)
export function listenToProperties(userId: string, callback: (data: any[]) => void) {
  const q = query(collection(db, "properties"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const result = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(result);
  });
}

// Editar
export async function updateProperty(id: string, data: any) {
  const ref = doc(db, "properties", id);
  await updateDoc(ref, data);
}

// Deletar
export async function deleteProperty(id: string) {
  await deleteDoc(doc(db, "properties", id));
}
