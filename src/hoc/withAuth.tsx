/* eslint-disable react/display-name */
'use client'
import { useRouter } from 'next/navigation';
import { USER_TOKEN_KEY } from '../utils/constants';
import { JSX, useEffect, useState } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
    return (props: JSX.IntrinsicAttributes) => {
        const [isMounted, setIsMounted] = useState(false);
        const router = useRouter();

        useEffect(() => {
            setIsMounted(true);

            // Check for token
            if (!localStorage.getItem(USER_TOKEN_KEY)) {
                router.replace('/');
            }
        }, [router]);

        if (!isMounted) return null;

        // Render the wrapped component only if the component has mounted and the user is authenticated
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;