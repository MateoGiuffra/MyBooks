import { auth } from "@/api/config/firebase";
import { AuthFormType } from "@/types/auth";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { ReaderUser } from "@/types/user";
import { getUserById, saveOrUpdateUser } from "./repository";

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
        console.error(error);
    }
}

async function signInUser(loginForm: AuthFormType) {
    try {
        const { email, password } = loginForm;
        if (!email) throw new Error("User must have a email!");

        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
    }
}

async function signInByGoogle(_loginForm?: AuthFormType) {
    try {
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth, provider);

        const user = new ReaderUser(credentials.user);
        const savedUser = await getUserById(user.id)
        if (!savedUser) {
            saveOrUpdateUser(user);
        }
    } catch (error) {
        console.error(error);
    }
}

async function logout() {
    try {
        await signOut(auth);
        console.log("Deslogeado con exito!");
    } catch (error) {
        console.error(error);
    }
}

export { registerNewUser, logout, signInUser, signInByGoogle };
