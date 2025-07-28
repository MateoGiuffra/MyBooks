import { ID } from "./general"
import { BookG } from "./google-api/book-api"
import { FieldValue, Timestamp } from "firebase/firestore";
export interface Review {
    content: string,
    hasReview: boolean,
    score: number,
    publishedRead: Timestamp | Date;
}

export interface SimpleBook {
    id: ID,
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        categories?: string[],
        publishedDate: string;
        imageLinks: {
            smallThumbnail?: string;
            thumbnail?: string;
        };
    }
    review: Review;
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
        publishedDate: string;
        imageLinks: {
            smallThumbnail?: string;
            thumbnail?: string;
        };
    }
    review: Review;
}
