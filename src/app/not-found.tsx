import ErrorPageLayout from '@/layouts/error-page'
import React from 'react'

const NotFoundPage = () => {
    return (
        <ErrorPageLayout title="Recurso No Encontrado" subtitle='El recurso que estas buscando no existe. Por favor vuelva al Home.' />
    )
}

export default NotFoundPage