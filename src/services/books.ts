import axios from "axios";
import { API_KEY, URI } from "@/api/config/constants";
import { Book, SimpleBook } from "@/types/book";
import { ID } from "@/types/general";
import { BookG, VolumeG } from "@/types/google-api/book-api";
import { toSimpleBookDTO } from "../api/dto/book";

async function searchBooks(word = "fantasy"): Promise<SimpleBook[] | undefined> {
    try {
        const { data } = await axios.get(`${URI}/volumes?q=${word}`)
        const { items }: VolumeG = data;
        return items.map((i) => toSimpleBookDTO(i));
    } catch (err) {
        return [];
    }
}

async function getBookById(id: ID): Promise<BookG | undefined> {
    try {
        const { data: book } = await axios.get(`${URI}/volumes/${id}`);
        return book;
    } catch (err) {
        return undefined;
    }
}

async function getMyBooks() {
    try {
        const res = await axios.get(`${URI}/blogs/2399953?key=${API_KEY?.toString()}`)
        return res.data;
    } catch (err) {

    }
}

export const booksService = {
    searchBooks,
    getMyBooks,
    getBookById
}
