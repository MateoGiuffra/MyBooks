import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from '@/api/config/firebase';
import { useRouter } from 'next/navigation';
import { userService } from "@/services/user/service";
import { ReaderUser } from '@/types/user';
import React, { useEffect, useState } from 'react'

export function useUserAuthenticated(goToLogin: boolean = true) {
    const [id, setId] = useState<string>("");
    const [userState, setUserState] = useState<ReaderUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (!user) {
                setUserState(null);
                setId("");
                goToLogin && router.replace("/login")
            } else {
                setId(user.uid)
            }
            setIsLoading(false);
        });
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