import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/api/config/firebase';
import { useRouter } from 'next/navigation';
import { userService } from "@/services/user/service";
import { ReaderUser } from '@/types/user';
import { useEffect, useState } from 'react'
import { usePathname } from "next/navigation";

export function useUserAuthenticated(goToLogin: boolean = true) {
    const [id, setId] = useState<string>("");
    const [userState, setUserState] = useState<ReaderUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const suscribe = onAuthStateChanged(auth, (user) => {
            setIsLoading(true);
            if (!user) {
                setUserState(null);
                setId("");
                if (goToLogin && !pathname.includes("register")) {
                    router.replace("/login")
                }
            } else {
                setId(user.uid)
            }
            setIsLoading(false);
        });
        return () => suscribe()
    }, [])

    const setCurrentUser = async () => {
        setUserState(await userService.getUserById(id) ?? null);
    }

    useEffect(() => {
        if (id) {
            setCurrentUser();
        }
    }, [id])

    return { id, userState, isLoading, router }

}