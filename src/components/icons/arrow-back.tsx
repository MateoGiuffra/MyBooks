"use client"
import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import React from 'react'

const ArrowBack = () => {
    const router = useRouter()

    return (
        <div onClick={() => router.back()} className='absolute flex top-0 item-center justify-center h-header left-5'>
            <ArrowLeftIcon width={24} />
        </div>
    )
}

export default ArrowBack