import { FormControl, TextField } from '@mui/material';
import { UseFormRegister, FieldError } from 'react-hook-form';

type CustomTextFieldProps = {
    label: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    validation: object;
};

export const CustomTextField = ({ label, name, type = "text", register, error, validation }: CustomTextFieldProps) => (
    <FormControl fullWidth margin="normal" error={!!error}>
        <TextField
            required
            fullWidth
            label={label}
            type={type}
            {...register(name, validation)}
            error={!!error}
            helperText={error ? error.message : ''}
        />
    </FormControl>
);
