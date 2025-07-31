import ErrorPageLayout from '@/layouts/error-page'
import React from 'react'

const NoResultsCard = () => {
    return (
        <ErrorPageLayout
            title='No se encontraron resultados'
            subtitle='No pudimos encontrar ningún libro que coincida con tu búsqueda. Por favor intenta de nuevo con otra palabra.'
            redirectToHome={false}
            imgSrc="/images/no-results-in-search.png"
            showHeader={false}
        />
    )
}

export default NoResultsCard