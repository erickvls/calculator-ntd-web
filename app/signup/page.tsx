'use client';
import { AuthForm } from '@/src/components/AuthForm';
import { useUser } from '@/src/hooks/useUser';
import { toast } from 'react-toastify';

export default function SignUp() {
  const { register: registerUser } = useUser();

  const handleRegister = async ({ email, password }: { email: string, password: string }) => {
    try {
      await registerUser(email, password);
      toast.success('Registration successful!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <AuthForm
      onSubmit={handleRegister}
      title="Calculator - Sign Up"
      buttonText="Register Now"
      linkText="Do you already have an account?"
      linkHref="/"
      isSubmitting={false}
    />
  );
}
