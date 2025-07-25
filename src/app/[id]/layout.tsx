import Header from '@/components/header'
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col items-center w-full h-full'>
            <Header title="Detalles del Libro" />
            {children}
        </div>
    )
}

export default AuthLayout