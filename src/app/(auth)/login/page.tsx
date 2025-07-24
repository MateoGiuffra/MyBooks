"use client"
import React from 'react'
import FormPageLayout from '@/layouts/auth-form-layout'
import AuthForm from '@/components/auth-form'

const LoginPage = () => {
    const title = "Iniciar Sesión"
    return (
        <FormPageLayout title={title} href="/register" footerText="¿No tienes una cuenta? Registrate acá">
            <AuthForm.Root btnText={title} auth={() => { }}>
                <AuthForm.EmailInput />
                <AuthForm.PasswordInput />
            </AuthForm.Root>
        </FormPageLayout >
    )
}

export default LoginPage