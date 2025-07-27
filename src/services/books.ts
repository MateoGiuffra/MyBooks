import axios from "axios";
import { API_KEY, URI } from "@/api/config/constants";
import { Book, BookFirestore, Review, SimpleBook } from "@/types/book";
import { ID } from "@/types/general";
import { BookG, VolumeG } from "@/types/google-api/book-api";
import { toFirestoreBookDTO, toSimpleBookDTO } from "../api/dto/book";
import { db } from "@/api/config/constants";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

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

async function getFirestoreBookByUserId(bookId: ID, userId: ID) {
    try {
        if (!userId || !bookId) return null
        const docRef = await getDoc(doc(db, "users", userId, "books", bookId))
        return docRef.exists() ? docRef.data() as BookFirestore : null
    } catch (error) {
        console.error(error)
        return null
    }
}

async function getMyBooksByUserId(userId: ID) {
    try {
        if (!userId) return []
        const docRef = await getDocs(collection(db, "users", userId, "books"))
        if (docRef.empty) {
            return []
        } else {
            const docs = docRef.docs
            return docs.map((doc) => doc.data() as BookFirestore)
        }
    } catch (error) {
        console.error(error)
        return []
    }
}

async function saveOrUpdateBook(initialBook: Book | BookFirestore, userId: ID) {
    try {
        const firestoreBook = toFirestoreBookDTO(initialBook);
        const book = {
            ...firestoreBook,
            review: {
                ...(firestoreBook.review ?? {}),
                hasReview: true,
            },
        };
        const { id: bookId } = book;

        const reviewsRef = doc(db, "users", userId, "books", bookId);
        await setDoc(reviewsRef, book, { merge: true });
    } catch (error) {

    }
}

export const booksService = {
    searchBooks,
    getMyBooksByUserId,
    getBookById,
    getFirestoreBookByUserId,
    saveOrUpdateBook,
}
