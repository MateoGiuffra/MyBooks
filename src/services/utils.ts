import { FirebaseError } from "firebase/app";
import { BadRequestException, NotFoundException } from "./exceptions";
import { AxiosError } from "axios";

const handleFirebaseException = (error: unknown) => {
    if (error instanceof FirebaseError) {
        switch (error.code) {
            case "auth/invalid-email":
                throw new BadRequestException("Invalid email format.");
            case "auth/user-disabled":
                throw new BadRequestException("User account is disabled.");
            case "auth/user-not-found":
                throw new BadRequestException("User not found.");
            case "auth/wrong-password":
                throw new BadRequestException("Incorrect password.");
            case "auth/too-many-requests":
                throw new BadRequestException("Too many login attempts. Try again later.");
            case "auth/network-request-failed":
                throw new BadRequestException("Network error. Please check your connection.");
            default:
                throw new BadRequestException(`Firebase Auth error: ${error.message}`);
        }
    } else {
        throw new BadRequestException(`Unexpected error: ${error}`);
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