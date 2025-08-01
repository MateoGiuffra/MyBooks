import { FirebaseError } from "firebase/app";
import { BadRequestException, NotFoundException } from "./exceptions";
import { AxiosError } from "axios";

const handleFirebaseException = (error: unknown) => {
    if (error instanceof FirebaseError) {
        switch (error.code) {
            case "auth/invalid-email":
                throw new BadRequestException("Formato de email invalido.");
            case "auth/user-disabled":
                throw new BadRequestException("La cuenta se encuentra deshabilitada. Por favor intenta con otra cuenta.");
            case "auth/user-not-found":
                throw new BadRequestException("No existe el usuario registrado.");
            case "auth/wrong-password":
                throw new BadRequestException("Contraseña incorrecta.");
            case "auth/too-many-requests":
                throw new BadRequestException("Muchos intentos. Intenta de nuevo más tarde.");
            case "auth/network-request-failed":
                throw new BadRequestException("Error de conexión. Por favor revisa tu conexión.");
            case "auth/invalid-credential":
                throw new BadRequestException("La contraseña o el email son incorrectos.");
            default:
                throw new BadRequestException(`Ocurrio un error, intentalo más tarde: ${error.message}`);
        }
    } else {
        throw new BadRequestException(`Error inesperado: ${error}`);
    }
}

const handleAxiosException = (error: AxiosError) => {
    switch (error.status) {
        case 404:
            throw new NotFoundException("Resource not found");
        case 503:
            throw new NotFoundException("Resource not found");
        default:
            break;
    }
}

export {
    handleFirebaseException, handleAxiosException
}