import { setDoc, doc, getDoc, collection, DocumentData } from "firebase/firestore";
import { db } from "@/api/config/constants";
import { ReaderUser, readerUserConverter, ReaderUserI } from "@/types/user";
import { ID } from "@/types/general";
import { Book, BookFirestore } from "@/types/book";
import { booksService } from "../books";

const { saveOrUpdateBook } = booksService

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

        await registerNewReview(userDoc, bigBook);
        await saveOrUpdateBook(bigBook, id);

        console.log("✅ Review registrada correctamente");
    } catch (error) {
        console.error("❌ Error updating document: ", error);
    }
}



async function addNewBookByUser(book: BookFirestore, userId: ID) {
    try {
        if (!userId) {
            throw new Error("Se necesitan IDs!");
        }
        const userDoc = await getDoc(doc(db, "users", userId));
        if (!userDoc.exists()) {
            throw new Error("User not found in Firestore");
        }

        const docRef = doc(collection(db, "users", userId, "books"));
        const bookWithId = {
            ...book,
            id: docRef.id,
        }

        await registerNewReview(userDoc, bookWithId);
        await saveOrUpdateBook(bookWithId, userId);
    } catch (error) {
        console.error(error);
    }
}

async function registerNewReview(userDoc: DocumentData, book: BookFirestore | Book) {
    try {
        const readerUser = userDoc.data() as ReaderUserI;
        const readerUserInstance = new ReaderUser();
        readerUserInstance.fromJSON(readerUser);
        readerUserInstance.registerNewReview(book.review);

        await setDoc(doc(db, "users", readerUser.id), readerUserInstance.toJSON(), { merge: true });
    } catch (error) {
        console.error(error)
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

export { getUserById, addUserReadBook, saveOrUpdateUser, addNewBookByUser }
