import { registerNewUser, signInUser, logout, signInByGoogle } from "./auth"
import { getUserById, addUserReadBook, addNewBookByUser } from "./repository"

export const userService = {
    registerNewUser,
    signInUser,
    getUserById,
    logout,
    addUserReadBook,
    signInByGoogle,
    addNewBookByUser
}