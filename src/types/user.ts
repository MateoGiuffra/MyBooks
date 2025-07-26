import { User } from "firebase/auth";
import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Review } from "./book";

export interface ReaderUserI {
    id: string,
    email: string,
    displayName: string,
    description: string,
    reviewsAmount: number,
    averageRating: number,
    sumOfRatings: number,
    booksAmount: number,
    image: string,
}

export class ReaderUser implements ReaderUserI {
    id: string;
    email: string;
    displayName: string;
    description: string;
    reviewsAmount: number;
    averageRating: number;
    sumOfRatings: number;
    booksAmount: number;
    image: string;

    constructor(user?: User) {
        this.id = user?.uid ?? "";
        this.email = user?.email ?? "";
        this.displayName = user?.displayName ?? "";
        this.description = "";
        this.reviewsAmount = 0;
        this.averageRating = 0;
        this.sumOfRatings = 0;
        this.booksAmount = 0;
        this.image = user?.photoURL ?? "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2018_50/2680771/181212-woman-reading-book-grass-stock-cs-1235p.jpg";
    }

    registerNewReview(review: Review) {
        if (!review.hasReview) {
            this.reviewsAmount++;
            this.sumOfRatings += review.score;
            this.averageRating = this.sumOfRatings / this.reviewsAmount;
        } else {
            console.log("No updatie porque ya tenia review")
        }
    }

    fromJSON(user: ReaderUserI) {
        this.id = user.id;
        this.email = user.email;
        this.displayName = user.displayName;
        this.description = user.description;
        this.reviewsAmount = user.reviewsAmount;
        this.averageRating = user.averageRating;
        this.sumOfRatings = user.sumOfRatings;
        this.booksAmount = user.booksAmount;
        this.image = user.image;
    }

    toJSON(): ReaderUserI {
        return {
            id: this.id,
            email: this.email,
            displayName: this.displayName,
            description: this.description,
            reviewsAmount: this.reviewsAmount,
            averageRating: this.averageRating,
            sumOfRatings: this.sumOfRatings,
            booksAmount: this.booksAmount,
            image: this.image,
        };
    }
}

export const readerUserConverter = {
    toFirestore: (user: ReaderUserI) => {
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            description: user.description,
            reviewsAmount: user.reviewsAmount,
            averageRating: user.averageRating,
            sumOfRatings: user.sumOfRatings,
            booksAmount: user.booksAmount,
            image: user.image,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const user = snapshot.data(options);
        return {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            description: user.description,
            reviewsAmount: user.reviewsAmount,
            averageRating: user.averageRating,
            sumOfRatings: user.sumOfRatings,
            booksAmount: user.booksAmount,
            image: user.image,
        } as ReaderUser;
    }
};