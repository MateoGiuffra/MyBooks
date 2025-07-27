import React from 'react'
import Home from '@/components/home/home';

const page = () => {

    return (
        <div className='w-full h-screen items-center flex-col justify-center'>
            <main className='flex flex-col items-center w-full h-full'>
                <Home />
            </main>
        </div>
    )
}

export default page