import { auth } from "@/api/config/firebase";
import { AuthFormType } from "@/types/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { saveToken } from "./token";
import { db } from "@/api/config/constants";
import { ReaderUser, readerUserConverter, ReaderUserI } from "@/types/user";
import { ID } from "@/types/general";
import { Book, BookFirestore, Review } from "@/types/book";
import { toFirestoreBookDTO } from "@/api/dto/book";

// auth
async function createNewUser(registerForm: AuthFormType) {
    try {
        const { email, password, nickname } = registerForm;
        if (!email) throw new Error("User must have a email!");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: nickname,
            photoURL: registerForm.image ?? "https://img.freepik.com/foto-gratis/composicion-libros-libro-abierto_23-2147690555.jpg"
        });
        const user = new ReaderUser(userCredential.user);
        saveUserInDatabase(user);
    } catch (error) {
        console.error(error);
    }
}

async function signInUser(loginForm: AuthFormType) {
    try {
        const { email, password } = loginForm;
        if (!email) throw new Error("User must have a email!");
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error)
    }
}


async function signInByGoogle(loginForm: AuthFormType) {
    try {
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        const user = new ReaderUser(credentials.user);
        saveUserInDatabase(user);
    } catch (error) {
        console.error(error)
    }
}



async function logout() {
    try {
        await signOut(auth);
        console.log("Deslogeado con exito!")
    } catch (error) {
        console.error(error)
    }
}
// auth


async function saveUserInDatabase(user: ReaderUserI) {
    try {
        const ref = doc(db, "users", user.id).withConverter(readerUserConverter);
        await setDoc(ref, user, { merge: true });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

async function addBookReadByUser(bigBook: Book | BookFirestore, readerUser: ReaderUserI) {
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


async function getCurrentUser(id: ID) {
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() as ReaderUser : null
    } catch (error) {
        console.error("Error getting document: ", error);
    }
}

export const userService = {
    createNewUser,
    signInUser,
    getCurrentUser,
    logout,
    addBookReadByUser,
    signInByGoogle
}