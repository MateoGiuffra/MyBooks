import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const URI = "https://www.googleapis.com/books/v1"