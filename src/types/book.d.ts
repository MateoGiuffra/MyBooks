import { ID } from "./general"
import { BookG } from "./google-api/book-api"
import { FieldValue, Timestamp } from "firebase/firestore";
export interface Review {
    content: string,
    hasReview: boolean,
    score: number,
    publishedRead: Timestamp | FieldValue;
}

export interface SimpleBook {
    id: ID,
    authors: string[],
    title: string,
    description: string,
    categories: string[],
    review: Review,
    imageLinks: {
        smallThumbnail: string,
        thumbnail: string
    }
}

export interface Book extends BookG {
    review: Review
}

export interface BookFirestore {
    id: ID,
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        imageLinks: {
            smallThumbnail?: string;
            thumbnail?: string;
        };
    }
    review: Review;
}
