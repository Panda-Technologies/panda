"use client";

import dynamic from 'next/dynamic';
import { Authenticated } from "@refinedev/core";
import { Suspense } from "react";

// Dynamic import for ErrorComponent
const ErrorComponent = dynamic(
    () => import("@refinedev/antd").then((mod) => mod.ErrorComponent),
    {
        ssr: false,
        loading: () => <div>Loading error page...</div>
    }
);

export default function NotFound() {
    return (
        <Suspense>
            <Authenticated key="not-found">
                <ErrorComponent />
            </Authenticated>
        </Suspense>
    );
}