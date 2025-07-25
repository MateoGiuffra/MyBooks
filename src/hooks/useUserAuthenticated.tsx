import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from '@/api/config/firebase';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/users';
import { ReaderUser } from '@/types/user';
import React, { useEffect, useState } from 'react'

export function useUserAuthenticated(goToLogin: boolean = true) {
    const [id, setId] = useState<string>("");
    const [userState, setUserState] = useState<ReaderUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                setUserState(null);
                setId("");
                goToLogin && router.replace("/login")
                return;
            } else {
                setId(user.uid)
            }
        });
        setIsLoading(false);
    }, [])

    const setCurrentUser = async () => {
        setUserState(await userService.getCurrentUser(id) ?? null);
    }

    useEffect(() => {
        if (id) {
            setCurrentUser();
        }
    }, [id])

    return { id, userState, isLoading, router }

}