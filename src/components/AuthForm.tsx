import { Button, CircularProgress, Typography, Link } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomTextField } from './CustomTextField';
import { FormLayout } from './FormLayout';

type Inputs = {
    email: string;
    password: string;
};

type AuthFormProps = {
    onSubmit: SubmitHandler<Inputs>;
    title: string;
    buttonText: string;
    linkText: string;
    linkHref: string;
    isSubmitting: boolean;
};

export const AuthForm = ({
    onSubmit,
    title,
    buttonText,
    linkText,
    linkHref,
    isSubmitting
}: AuthFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    return (
        <FormLayout title={title}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomTextField
                    label="Username or Email"
                    name="email"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email format',
                        },
                    }}
                />

                <CustomTextField
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24} /> : buttonText}
                </Button>

                <Typography align="center" sx={{ mt: 2 }}>
                    {linkText}{' '}
                    <Link href={linkHref} underline="hover">
                        {linkText === 'Don’t have an account?' ? 'Create a new account' : 'Login'}
                    </Link>
                </Typography>
            </form>
        </FormLayout>
    );
};
