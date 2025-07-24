import axios from "axios";
import { API_KEY, URI } from "./constants";
import { Book } from "@/types/book";

async function searchBooks(word?: string): Promise<Book[] | undefined> {
    try {
        const query = word ? `?q=${word}` : ""
        console.log(`${URI}/volumes${query}`)
        const { data } = await axios.get(`${URI}/volumes?q=${word}`)
        const { items } = data;

        const books = items.map((i) => {
            const { title, description, imageLinks, authors, categories } = i.volumeInfo;
            return {
                id: i.id,
                title,
                authors,
                categories,
                review: { content: "", hasReview: false, score: 0 },
                description,
                imageLinks,
            }
        }) as Book[];
        return books;
    } catch (err) {
        return [];
    }
}

async function getMyBooks() {
    try {
        const res = await axios.get(`${URI}/blogs/2399953?key=${API_KEY?.toString()}`)
        return res.data;
    } catch (err) {

    }
}

export const booksServices = {
    searchBooks,
    getMyBooks
}
