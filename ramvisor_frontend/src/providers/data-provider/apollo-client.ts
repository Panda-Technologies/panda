import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let client: ApolloClient<any> | null = null;

export const getClient = () => {
    if (!client || typeof window === 'undefined') {
        client = new ApolloClient({
            cache: new InMemoryCache(),
            link: new HttpLink({
                uri: 'http://localhost:5001/graphql',
                credentials: 'include',
            }),
            defaultOptions: {
                query: {
                    fetchPolicy: 'cache-first',
                },
                watchQuery: {
                    fetchPolicy: 'cache-and-network',
                },
            },
            ssrMode: typeof window === 'undefined',
        });
    }

    return client;
};