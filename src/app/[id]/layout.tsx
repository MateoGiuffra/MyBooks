import ArrowBack from '@/components/icons/arrow-back'
import Header from '@/components/ui/header'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col items-center w-full h-full'>
            <Header title="Detalles del Libro" ArrowBack={<ArrowBack />} />
            {children}
        </div>
    )
}

export default AuthLayout