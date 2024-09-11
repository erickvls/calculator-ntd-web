'use client';
import { AuthForm } from '@/src/components/AuthForm';
import { useUser } from '@/src/hooks/useUser';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Page() {
    const { login: loginUser } = useUser();
    const router = useRouter();

    const handleLogin = async ({ email, password }: { email: string, password: string }) => {
        try {
            await loginUser(email, password);
            router.push('/home');
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        }
    };

    return (
        <AuthForm
            onSubmit={handleLogin}
            title="Calculator - Log In"
            buttonText="Log In"
            linkText="Don’t have an account?"
            linkHref="/signup"
            isSubmitting={false}
        />
    );
}
