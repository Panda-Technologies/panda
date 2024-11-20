import express from 'express';
import { getSchema } from './graphql/schema';
import { ApolloServer } from 'apollo-server-express';
import { getMyPrismaClient } from './db';
import { IMyContext, ISession } from './interface';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const main = async () => {
    dotenv.config();

    const proxy = require('express-http-proxy');

    const app = express();

    app.use(cookieParser());

    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:5001',
        'https://studio.apollographql.com'
    ];

    app.use(cors({
        origin: function(origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The server policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(session({
        secret: process.env.SESSION_SECRET!,
        name: 'gql-api',
        resave: true,
        rolling: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: false,
            sameSite: 'lax',
            path: '/',
        }
    }) as express.RequestHandler);

    app.use((req, _, next) => {
        console.log('Debug Middleware:');
        console.log('Cookies:', req.cookies);
        console.log('Session:', req.session);
        console.log('Session ID:', req.sessionID);
        next();
    });

    const schema = await getSchema();

    const prisma = await getMyPrismaClient();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }): IMyContext => ({ req, res, prisma, session: req.session as ISession, }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: false,
        path: '/graphql'
    });

    const PORT = process.env.PORT || 5001;

    app.use(proxy('http://127.0.0.1:3000'));

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    app.use((req, _, next) => {
        console.log('Cookies:', req.cookies);
        console.log('Session:', req.session);
        next();
    })
};

main().catch(err => {
    console.error(err);
    process.exit(1);
})