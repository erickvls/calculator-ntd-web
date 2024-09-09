'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/src/services/api.service';
import Header from '@/src/components/Header';
import { USER_TOKEN_KEY } from '../utils/constants';

export default function HeaderWrapper() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = getCookie(USER_TOKEN_KEY);
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push('/');
        }
    }, [router]);

    return (
        <>
            {isAuthenticated && <Header />} {/* Renderiza o Header apenas se autenticado */}
        </>
    );
}
