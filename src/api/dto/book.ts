import { SimpleBook } from "@/types/book";
import { BookG } from "@/types/google-api/book-api";

export function toSimpleBookDTO(book: BookG): SimpleBook {
    const { title, description, imageLinks, authors, categories } = book.volumeInfo;
    return {
        id: book.id,
        title,
        authors,
        categories,
        review: { content: "", hasReview: false, score: 0 },
        description,
        imageLinks,
    }
}

