import { ID } from "./general"
import { BookG } from "./google-api/book-api"

export interface Review {
    content: string,
    hasReview: boolean,
    score: number
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

