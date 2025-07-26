"use client"
import React from 'react'
import FormPageLayout from '@/layouts/auth-form-layout'
import AuthForm from '@/components/user/auth-form'
import { userService } from '@/services/user/service'

const RegisterPage = () => {
    const title = "Registrarse"
    return (
        <FormPageLayout title={title} href="/login" footerText="¿Tienes una cuenta? Inicia sesión acá">
            <AuthForm.Root btnText={title} auth={userService.registerNewUser}>
                <AuthForm.NicknameInput />
                <AuthForm.EmailInput />
                <AuthForm.PasswordInput />
            </AuthForm.Root>
        </FormPageLayout>
    )
}

export default RegisterPage