import axios from "axios";
import { API_KEY, URI } from "@/api/config/constants";
import { Book, BookFirestore, Review, SimpleBook } from "@/types/book";
import { ID } from "@/types/general";
import { BookG, VolumeG } from "@/types/google-api/book-api";
import { toFirestoreBookDTO, toSimpleBookDTO } from "../api/dto/book";
import { db } from "@/api/config/constants";
import { collection, doc, FieldPath, getDoc, getDocs, limit, query, setDoc, where } from "firebase/firestore";

async function searchBooks(word = "fantasy"): Promise<SimpleBook[]> {
    try {
        console.log("word", word)
        const { data } = await axios.get(`${URI}/volumes?q=${word.trim() == "" ? "fantasy" : word}`)
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

async function searchBooksOfUserIdByWord(userId: ID, word?: string) {
    try {
        if (!userId) return []
        const booksRef = collection(db, "users", userId, "books");
        const q = query(booksRef, limit(20));
        const docRef = await getDocs(q);
        if (docRef.empty) {
            return []
        }

        const firestoreBooks = docRef.docs.map((doc) => doc.data() as BookFirestore)

        if (word) {
            return firestoreBooks.filter((book) => book.volumeInfo.title.toLowerCase().includes(word.toLowerCase())).slice(0, 9);
        }
        return firestoreBooks.slice(0, 9);
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
    searchBooksOfUserIdByWord,
    getBookById,
    getFirestoreBookByUserId,
    saveOrUpdateBook,
}
