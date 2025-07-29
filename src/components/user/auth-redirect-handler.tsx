"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user/service";

export default function AuthRedirectHandler() {
    const router = useRouter();

    useEffect(() => {
        userService.handleGoogleRedirect().then(() => {
            router.replace("/");
        });
    }, []);

    return null;
}
