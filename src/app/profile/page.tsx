"use client"
import React from 'react'
import { userService } from '@/services/user/service';
import InfoCard from '@/components/user/info-card';
import Header from '@/components/ui/header';
import BookButton from '@/components/ui/book-button';
import Spinner from '@/components/loading/spinner';
import { useUserAuthenticated } from '@/hooks/useUserAuthenticated';

const page = () => {

    const { userState, isLoading, router } = useUserAuthenticated()

    const closeSession = async () => {
        await userService.logout()
        router.replace("/")
    }

    if (isLoading || !userState) return <div className='absolute h-full w-full inset-0 m-auto'><Spinner /></div>

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
                    <BookButton bgColor='blue' fontColor='white'>
                        Editar Perfil
                    </BookButton>
                    <section className='flex items-center w-full gap-4 justify-center h-full'>
                        <InfoCard title={reviewsAmount} subtitle="Reviews" />
                        <InfoCard title={booksAmount} subtitle="Libros" />
                        <InfoCard title={averageRating} subtitle="Promedio de Estrellas" />
                    </section>
                </div>
                <div className='w-full flex-grow h-full mt-[271px]'>
                    <BookButton onHandleClick={() => closeSession()}>
                        <p>Cerrar Sesión</p>
                    </BookButton>
                </div>
            </div>
        </div>

    )
}

export default page