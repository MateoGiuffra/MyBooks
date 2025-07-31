import axios, { AxiosError } from "axios";
import { URI } from "@/api/config/constants";
import { Book, BookFirestore, Review, SimpleBook } from "@/types/book";
import { ID } from "@/types/general";
import { VolumeG } from "@/types/google-api/book-api";
import { toFirestoreBookDTO, toSimpleBookDTO } from "../api/dto/book";
import { db } from "@/api/config/constants";
import { collection, doc, getDoc, getDocs, limit, query, setDoc } from "firebase/firestore";
import { handleAxiosException } from "./utils";
import { BadRequestException, NotFoundException } from "./exceptions";

async function searchBooks(word = "fantasy"): Promise<SimpleBook[]> {
    try {
        const { data } = await axios.get(`${URI}/volumes?q=${word.trim() == "" ? "fantasy" : word}`)
        const { items }: VolumeG = data;
        if (items !== undefined && items !== null) {
            return items.map((i) => toSimpleBookDTO(i));
        }
        return []
    } catch (error) {
        console.error(error)
        return [];
    }
}

async function getBookById(id: ID): Promise<Book | BookFirestore | undefined | null> {
    try {
        console.log(`${URI}/volumes/${id}`)
        const { data: book } = await axios.get(`${URI}/volumes/${id}`);
        const bookWithInitialReview = {
            ...book, review: {
                hasReview: false,
                content: "",
                score: 2.5
            } as Review
        }
        return bookWithInitialReview
    } catch (error) {
        if (error instanceof AxiosError) {
            handleAxiosException(error)
        }
        return null;
    }
}

async function getFirestoreBookByUserId(bookId: ID, userId: ID) {
    try {
        if (!userId || !bookId) { throw new BadRequestException("Must be the bookId and userId") }
        const docRef = await getDoc(doc(db, "users", userId, "books", bookId))
        if (docRef.exists()) {
            return docRef.data() as BookFirestore
        } else {
            throw new NotFoundException("Book with " + bookId + " not found")
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            handleAxiosException(error)
        }
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
        if (error instanceof AxiosError) {
            handleAxiosException(error)
        }
    }
}

export const booksService = {
    searchBooks,
    searchBooksOfUserIdByWord,
    getBookById,
    getFirestoreBookByUserId,
    saveOrUpdateBook,
}
