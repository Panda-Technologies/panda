"use client";

import { ApolloProvider } from '@apollo/client';
import { useState } from 'react';
import { getClient } from './apollo-client';

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(() => getClient());

    return (
        <ApolloProvider client={client}>{children}</ApolloProvider>
    );
}