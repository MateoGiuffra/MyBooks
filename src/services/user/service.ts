import { registerNewUser, signInUser, logout, signInByGoogle } from "./auth"
import { getCurrentUser, addBookReadByUser } from "./repository"

export const userService = {
    registerNewUser,
    signInUser,
    getCurrentUser,
    logout,
    addBookReadByUser,
    signInByGoogle
}