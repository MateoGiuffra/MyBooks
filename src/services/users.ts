import { auth } from "@/api/config/firebase";
import { AuthFormType } from "@/types/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { saveToken } from "./token";
import { db } from "@/api/config/constants";
import { ReaderUser, readerUserConverter, ReaderUserI } from "@/types/user";
import { ID } from "@/types/general";
import { Review } from "@/types/book";

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
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    } catch (error) {

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
        await setDoc(ref, user);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

async function addBookReviewToUser(readerUser: ReaderUser, newReview: Review, bookId: ID) {
    try {
        const { id } = readerUser;
        const reviewsRef = doc(db, "users", id, "reviews", bookId);
        await setDoc(reviewsRef, newReview);
        await setDoc(doc(db, "users", id), readerUser, { merge: true })
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}


async function addBookReadToUser(readerUser: ReaderUser, bookId: ID) {
    try {
        const { id } = readerUser;
        const reviewsRef = doc(db, "users", id, "reviews", bookId);
        await setDoc(reviewsRef, {
            content: "",
            hasReview: false,
            score: 0
        });
        await setDoc(doc(db, "users", id), readerUser, { merge: true })
    } catch (error) {
        console.error("Error updating document: ", error);
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
    addBookReviewToUser,
    getCurrentUser,
    logout,
    addBookReadToUser
}