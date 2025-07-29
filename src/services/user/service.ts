import { registerNewUser, signInUser, logout, signInByGoogle, handleGoogleRedirect } from "./auth"
import { getUserById, addUserReadBook, addNewBookByUser } from "./repository"

export const userService = {
    registerNewUser,
    handleGoogleRedirect,
    signInUser,
    getUserById,
    logout,
    addUserReadBook,
    signInByGoogle,
    addNewBookByUser
}