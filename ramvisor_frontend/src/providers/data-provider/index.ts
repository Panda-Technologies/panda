"use client";

import dataProviderNestjsQuery, {
    GraphQLClient,
    liveProvider as liveProviderNestjsQuery,
} from "@refinedev/nestjs-query";
import { createClient } from "graphql-ws";
import Cookies from 'js-cookie';

export const API_URL = "/graphql";
const WS_URL = "ws://localhost:5001/graphql";

export const getSessionCookie = () => {
    if (typeof window === 'undefined') return '';

    // Get the raw cookie value
    const rawCookie = Cookies.get('gql-api');
    if (!rawCookie) return '';

    // Clean the cookie value by removing just '25'
    const cleanedCookie = rawCookie.replace(/%25/g, '%');

    // Add the gql-api= prefix
    return `gql-api=${cleanedCookie}`;
};

// Create custom fetch function to handle cookies
const customFetch = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
        ...options,
        credentials: 'same-origin',
        headers: {
            ...options.headers,
            Cookie: getSessionCookie()
        }
    });

    // Handle Set-Cookie header
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
        const match = setCookie.match(/gql-api=([^;]+)/);
        if (match && match[1]) {
            Cookies.set('gql-api', match[1]);
        }
    }

    return response;
};

const gqlClient = new GraphQLClient(API_URL, {
    credentials: 'same-origin',
    fetch: customFetch,
});


const wsClient = createClient({
    url: WS_URL,
    connectionParams: () => ({
        credentials: 'same-origin',
        headers: {
            Cookie: getSessionCookie() ? `gql-api=${getSessionCookie()}` : '',
        },
    }),
});

export const dataProvider = dataProviderNestjsQuery(gqlClient);
export const liveProvider = liveProviderNestjsQuery(wsClient);