import Link from 'next/link'
import React from 'react'
import { LibrarySquareIcon, SearchIcon, User2Icon } from 'lucide-react'

const footer = () => {
    return (
        <footer className="w-full fixed bottom-0 border-t border-gray-400 bg-theme z-9999">
            <div className="w-full p-2 flex flex-row justify-between">
                <div className="flex flex-col items-center flex-1">
                    <Link href="/" className="flex items-center flex-col justify-center gap-1">
                        <LibrarySquareIcon width={34} height={34} />
                        <p className="">Tu Libreria</p>
                    </Link>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <Link href="/add-book" className="flex items-center justify-center flex-col gap-0.5">
                        <SearchIcon width={34} height={34} />
                        <p className="">Buscar</p>
                    </Link>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <Link href="/profile" className="flex items-center justify-center flex-col gap-0.5">
                        <User2Icon width={34} height={34} />
                        <p className="">Perfil</p>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default footer