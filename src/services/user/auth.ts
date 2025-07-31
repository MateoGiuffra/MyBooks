import { auth } from "@/api/config/firebase";
import { AuthFormType } from "@/types/auth";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
} from "firebase/auth";
import { ReaderUser } from "@/types/user";
import { getUserById, saveOrUpdateUser } from "./repository";
import { BadRequestException } from "../exceptions";
import { handleFirebaseException } from "../utils";

async function registerNewUser(registerForm: AuthFormType) {
    try {
        const { email, password, nickname } = registerForm;
        if (!email) throw new Error("User must have a email!");

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
            displayName: nickname,
            photoURL: registerForm.image ?? "https://img.freepik.com/foto-gratis/composicion-libros-libro-abierto_23-2147690555.jpg"
        });

        const user = new ReaderUser(userCredential.user);
        saveOrUpdateUser(user);
    } catch (error) {
        handleFirebaseException(error);
    }
}
async function signInUser(loginForm: AuthFormType) {
    try {
        const { email, password } = loginForm;
        if (!email) throw new BadRequestException("User must have an email!");

        const credentials = await signInWithEmailAndPassword(auth, email, password);
        const user = new ReaderUser(credentials.user);
        const savedUser = await getUserById(credentials.user.uid);
        if (!savedUser) {
            saveOrUpdateUser(user);
        }
    } catch (error) {
        handleFirebaseException(error);
    }
}

async function signInByGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    } catch (error) {
        handleFirebaseException(error);
    }
}

async function handleGoogleRedirect() {
    try {
        const result = await getRedirectResult(auth);
        if (!result?.user) return;

        const user = new ReaderUser(result.user);
        const savedUser = await getUserById(user.id);
        if (!savedUser) {
            await saveOrUpdateUser(user);
        }
    } catch (error) {
        handleFirebaseException(error);
    }
}

async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        handleFirebaseException(error);
    }
}

export { registerNewUser, handleGoogleRedirect, logout, signInUser, signInByGoogle };
