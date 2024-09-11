import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

type FormLayoutProps = {
    title: string;
    children: ReactNode;
};

export const FormLayout = ({ title, children }: FormLayoutProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
            }}
        >
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
