import { ID } from "./general";

export interface Book extends ID {
    authors: string[],
    title: string,
    description: string,
    categories: string[],
    review: {
        content: string,
        hasReview: boolean,
        score: number
    },
    imageLinks: {
        smallThumbnail: string,
        thumbnail: string
    }
}