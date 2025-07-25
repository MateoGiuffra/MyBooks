import axios from "axios";
import { API_KEY, URI } from "@/api/config/constants";
import { Book, BookFirestore, Review, SimpleBook } from "@/types/book";
import { ID } from "@/types/general";
import { BookG, VolumeG } from "@/types/google-api/book-api";
import { toSimpleBookDTO } from "../api/dto/book";
import { db } from "@/api/config/constants";
import { doc, getDoc } from "firebase/firestore";
async function searchBooks(word = "fantasy"): Promise<SimpleBook[]> {
    try {
        const { data } = await axios.get(`${URI}/volumes?q=${word}`)
        const { items }: VolumeG = data;
        return items.map((i) => toSimpleBookDTO(i));
    } catch (err) {
        return [];
    }
}

async function getBookById(id: ID): Promise<Book | undefined> {
    try {
        const { data: book } = await axios.get(`${URI}/volumes/${id}`);
        const bookWithInitialReview = {
            ...book, review: {
                hasReview: false,
                content: "",
                score: 2.5
            } as Review
        }
        return bookWithInitialReview
    } catch (err) {
        return undefined;
    }
}

async function getFirestoreBookById(userId: ID, bookId: ID) {

    try {
        if (!userId || !bookId) return null
        const docRef = await getDoc(doc(db, "users", userId, "books", bookId))
        return docRef.exists() ? docRef.data() as BookFirestore : null
    } catch (error) {
        console.error(error)
        return null
    }
}

async function getMyBooks() {
    try {
        const res = await axios.get(`${URI}/blogs/2399953?key=${API_KEY?.toString()}`)
        return res.data;
    } catch (error) {
        console.error(error)
        return []
    }
}

export const booksService = {
    searchBooks,
    getMyBooks,
    getBookById,
    getFirestoreBookById,

}
