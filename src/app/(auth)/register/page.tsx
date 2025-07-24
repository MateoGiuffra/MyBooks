import React from 'react'
import FormPageLayout from '@/layouts/auth-form-layout'
import AuthForm from '@/components/auth-form'

const RegisterPage = () => {
    const title = "Iniciar Sesión"
    return (
        <FormPageLayout title={title} href="/login" footerText="¿Tienes una cuenta? Inicia sesión acá">
            <AuthForm.Root btnText={title} auth={() => { }}>
                <AuthForm.NicknameInput />
                <AuthForm.EmailInput />
                <AuthForm.PasswordInput />
            </AuthForm.Root>
        </FormPageLayout>
    )
}

export default RegisterPage