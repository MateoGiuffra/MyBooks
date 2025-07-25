"use client"
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from '@/api/config/firebase';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/users';
import InfoCard from '@/components/info-card';
import { ReaderUser } from '@/types/user';
import Header from '@/components/header';
import BookButton from '@/components/button';

const page = () => {

    const [id, setId] = useState<string>("");
    const [userState, setUserState] = useState<ReaderUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                setUserState(null);
                router.replace("/login")
                return;
            } else {
                setId(user.uid)
            }
        });
        setIsLoading(false);
    })

    const setCurrentUser = async () => {
        setUserState(await userService.getCurrentUser(id) ?? null);
    }

    useEffect(() => {
        if (id) {
            setCurrentUser();
        }
    }, [id])

    const closeSession = async () => {
        await userService.logout()
        router.replace("/")
    }

    if (isLoading || !userState) return <div>Cargando...</div>

    const { reviewsAmount, booksAmount, description, averageRating, email, displayName, image } = userState;

    return (
        <div className='h-full'>
            <Header title="Mi Perfil" />
            <div className='flex flex-col items-center p-4 h-full justify-between'>
                <div className=' w-full flex flex-col items-center gap-4 h-full'>
                    <img
                        src={image}
                        alt={displayName}
                        className='w-[128px] h-[128px] object-cover rounded-[100%]' />
                    <section className='flex flex-col items-center justify-center'>
                        <h2 className='text-[22px] font-bold text-theme'>{displayName}</h2>
                        <p className='text-theme-lighter'>{email}</p>
                        <p className='text-theme-lighter'>{description}</p>
                    </section>
                    <BookButton>
                        Editar Perfil
                    </BookButton>
                    <section className='flex items-center w-full gap-4 justify-center h-full'>
                        <InfoCard title={reviewsAmount} subtitle="Reviews" />
                        <InfoCard title={booksAmount} subtitle="Libros" />
                        <InfoCard title={averageRating} subtitle="Promedio de Estrellas" />
                    </section>
                </div>
                <div className='w-full flex-grow h-full mt-[271px]'>
                    <BookButton bgColor='#e53535' fontColor='white' onHandleClick={() => closeSession()}>
                        <p>Cerrar Sesión</p>
                    </BookButton>
                </div>
            </div>
        </div>

    )
}

export default page