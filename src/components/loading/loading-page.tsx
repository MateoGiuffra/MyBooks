import React from 'react'
import Spinner from './spinner'

const LoadingPage = () => {
    return (
        <div className='absolute h-full w-full inset-0 m-auto'><Spinner /></div>
    )
}

export default LoadingPage