import { Book, BookFirestore, SimpleBook } from "@/types/book";
import { BookG } from "@/types/google-api/book-api";
import { serverTimestamp } from "firebase/firestore";

export function toSimpleBookDTO(book: BookG): SimpleBook {
    const { title, description, imageLinks, authors, categories } = book.volumeInfo;
    return {
        id: book.id,
        volumeInfo: {
            title,
            authors,
            description,
            imageLinks,
            categories
        },
        review: {
            content: "",
            hasReview: false,
            publishedRead: serverTimestamp(),
            score: 0
        }
    }
}


export function toFirestoreBookDTO(book: Book | BookFirestore) {
    const { title, description, imageLinks, authors } = book.volumeInfo;
    return {
        id: book.id,
        volumeInfo: {
            title,
            authors,
            description: description ?? "No Disponible",
            imageLinks,
        },
        review: {
            ...book.review,
            publishedRead: book.review.publishedRead ?? serverTimestamp()
        }
    }
}