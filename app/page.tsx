'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useUser } from '@/src/hooks/useUser';
import { Button, FormControl, TextField, Typography, Box, CircularProgress, Link } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Inputs = {
    email: string;
    password: string;
};

export default function Page() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<Inputs>();
    const { login: loginUser } = useUser();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        try {
            const result = await loginUser(email, password);
            router.push('/home');
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}
        >
            <Typography variant="h4" gutterBottom>
                Calculator - Log In
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    backgroundColor: '#fff',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <FormControl fullWidth margin="normal" error={!!errors.email}>
                    <TextField
                        required
                        fullWidth
                        label="Username or Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email format',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal" error={!!errors.password}>
                    <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Log In'}
                </Button>

                <Typography align="center" sx={{ mt: 2 }}>
                    Don’t have an account?{' '}
                    <Link href="/signup" underline="hover">
                        Create a new account
                    </Link>
                </Typography>
            </Box>

        </Box>
    );
}
