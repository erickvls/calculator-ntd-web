/* eslint-disable react/display-name */
'use client'
import { useRouter } from 'next/navigation';
import { USER_TOKEN_KEY } from '../utils/constants';
import { JSX } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
    return (props: JSX.IntrinsicAttributes) => {
        if (typeof window !== 'undefined') {
            const router = useRouter();

            if (!localStorage.getItem(USER_TOKEN_KEY)) {
                router.replace('/');
                return null;
            }

            return <WrappedComponent {...props} />;
        }

        return null;
    };
};

export default withAuth;