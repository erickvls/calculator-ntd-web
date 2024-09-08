import * as React from 'react';
import { Box as MaterialBox } from '@mui/material';

interface BoxProps {
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode;
}

export default function Box({ size = 'sm', children }: BoxProps) {
    const sizes = {
        sm: 400,
        md: 600,
        lg: 1000,
    }

    return (
        <MaterialBox
            sx={{
                backgroundColor: '#fff',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: sizes[size],
            }}
        >
            {children}
        </MaterialBox>
    );
}
