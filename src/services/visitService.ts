import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

export async function addVisit(data: any) {
  await addDoc(collection(db, "visits"), data);
}

export function listenToVisits(userId: string, callback: (data: any[]) => void) {
  const q = query(collection(db, "visits"), where("userId", "==", userId));
  return onSnapshot(q, (snapshot) => {
    const result = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(result);
  });
}