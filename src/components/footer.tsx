import { HomeIcon, UserIcon, } from '@heroicons/react/16/solid'
import AddIcon from '@/icons/add'
import Link from 'next/link'
import React from 'react'

const footer = () => {
    return (
        <footer className="w-full absolute bottom-0 bg-blue-200">
            <div className="w-full p-8 pt-2 pb-4 flex justify-between items-center">
                <Link href="/" className="flex items-center flex-col gap-1">
                    <HomeIcon width={34} height={34} />
                    <p className="">Home</p>
                </Link>
                <Link href="/login" className="flex items-center flex-col gap-0.5">
                    <AddIcon width={34} height={34} />
                    <p className="">Añadir Libro</p>
                </Link>
                <Link href="/profile" className="flex items-center flex-col gap-0.5">
                    <UserIcon width={34} height={34} />
                    <p className="">Perfil</p>
                </Link>
            </div>
        </footer>
    )
}

export default footer