'use client'

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/src/hooks/useUser';
import { Button, FormControl, FormHelperText, TextField, Typography, Box, CircularProgress } from '@mui/material';

type Inputs = {
    email: string
    password: string
}

export default function Page() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<Inputs>();
    const { register: registerUser } = useUser();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        const result = await registerUser(email, password);
        console.log(result);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh', // Centralizar verticalmente
            }}
        >
            <Typography variant="h4" gutterBottom>
                Calculator API - Sign Up
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
                    maxWidth: 400, // Para garantir que o formulário não seja muito largo
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
                    disabled={isSubmitting} // Desativa o botão enquanto submete
                >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Register Now'}
                </Button>
            </Box>
        </Box>
    );
}