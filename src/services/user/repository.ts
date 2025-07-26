import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/api/config/constants";
import { ReaderUser, readerUserConverter, ReaderUserI } from "@/types/user";
import { ID } from "@/types/general";
import { Book, BookFirestore } from "@/types/book";
import { toFirestoreBookDTO } from "@/api/dto/book";

async function saveOrUpdateUser(user: ReaderUserI) {
    try {
        const ref = doc(db, "users", user.id).withConverter(readerUserConverter);
        await setDoc(ref, user, { merge: true });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

async function addUserReadBook(bigBook: Book | BookFirestore, readerUser: ReaderUserI) {
    try {
        if (!readerUser.id || !bigBook.id) {
            throw new Error("Se necesitan IDs!");
        }
        const { id } = readerUser;

        const userDoc = await getDoc(doc(db, "users", id));
        if (!userDoc.exists()) {
            throw new Error("User not found in Firestore");
        }

        const firestoreBook = toFirestoreBookDTO(bigBook);

        const readerUserInstance = new ReaderUser();
        readerUserInstance.fromJSON(userDoc.data() as ReaderUserI);
        readerUserInstance.registerNewReview(firestoreBook.review);

        const book = {
            ...firestoreBook,
            review: {
                ...(firestoreBook.review ?? {}),
                hasReview: true,
            },
        };
        const { id: bookId } = book;

        const reviewsRef = doc(db, "users", id, "books", bookId);
        await setDoc(reviewsRef, book, { merge: true });

        await setDoc(doc(db, "users", id), readerUserInstance.toJSON(), { merge: true });

        console.log("✅ Review registrada correctamente");
    } catch (error) {
        console.error("❌ Error updating document: ", error);
    }
}


async function getUserById(id: ID) {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as ReaderUser : null
    } catch (error) {
        console.error("Error getting document: ", error);
    }
}

export { getUserById, addUserReadBook, saveOrUpdateUser }
