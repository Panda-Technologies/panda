import express from 'express';
import { getSchema } from './graphql/schema';
import { ApolloServer } from 'apollo-server-express';
import { getMyPrismaClient } from './db';
import { IMyContext, ISession } from './interface';
import session from 'express-session';
import dotenv from 'dotenv';
import { isProd } from './utils';
import cors from 'cors';

const main = async () => {

    dotenv.config();


    const app = express();

    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }))

    app.use(session({
        secret: process.env.SESSION_SECRET!,
        name: 'gql-api',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: isProd(),
            sameSite: 'lax',
        }
    }) as express.RequestHandler);

    const schema = await getSchema();

    const prisma = await getMyPrismaClient();

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }): IMyContext => ({ req, res, prisma, session: req.session as ISession, }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: {
            origin: ['http://localhost:3000'],
            credentials: true,
     }});

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

main().catch(err => {
    console.error(err);
    process.exit(1);
})