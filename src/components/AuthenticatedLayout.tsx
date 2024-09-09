'use client';

import Header from "./Header";
import { ReactNode } from "react";

interface AuthenticatedLayoutProps {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    );
}