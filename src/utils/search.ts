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
            const dateA =
                a.review?.publishedRelease instanceof Date
                    ? a.review.publishedRelease.getTime()
                    : Number((a.review?.publishedRelease as any)?.seconds) * 1000;

            const dateB =
                b.review?.publishedRelease instanceof Date
                    ? b.review.publishedRelease.getTime()
                    : Number((b.review?.publishedRelease as any)?.seconds) * 1000;

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


