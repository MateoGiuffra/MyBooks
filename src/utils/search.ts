import { BookFirestore, SimpleBook } from "@/types/book";

export const orderByTitle = (books: SimpleBook[] | BookFirestore[]) => {
    return [...books].sort((a, b) => {
        const nameA = a.volumeInfo.title.toUpperCase();
        const nameB = b.volumeInfo.title.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

export const orderByDate = (books: SimpleBook[] | BookFirestore[]) => {
    return [...books].sort((a, b) => {
        const dateA = Date.parse(a.volumeInfo.publishedDate)
        const dateB = Date.parse(b.volumeInfo.publishedDate)
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    });
}
export const orderByDateReview = (books: SimpleBook[] | BookFirestore[]) => {
    return [...books].sort((a, b) => {
        try {
            console.log(a.review.publishedRelease, typeof (a.review.publishedRelease))
            const dateA = Number(a.review.publishedRelease.seconds);

            const dateB = Number(b.review.publishedRelease.seconds);
            console.log(dateA, dateB)

            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            return 0;
        } catch (error) {
            return 0;
        }
    });
}


