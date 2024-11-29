// index.ts
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { getSchema } from './graphql/schema';
import { getMyPrismaClient } from './db';
import { IMyContext } from './interface';

const main = async () => {
    const app = express();

    // 1. Basic middleware
    app.use(express.json());
    app.use(cookieParser(process.env.SESSION_SECRET));

    // 2. CORS configuration
    app.use(cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5001',
            'https://studio.apollographql.com'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        exposedHeaders: ['Set-Cookie']
    }));

    // 3. Session configuration
    app.use(session({
        secret: process.env.SESSION_SECRET!,
        name: 'gql-api',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            domain: 'localhost',
        },
        store: new session.MemoryStore(),
    }) as express.RequestHandler);

    // 4. Debug middleware
    app.use((req, _, next) => {
        const signedCookies = req.signedCookies;
        const rawCookie = req.headers.cookie;

        console.log('\n=== Request Debug ===');
        console.log('Raw Cookie Header:', rawCookie);
        console.log('Signed Cookies:', signedCookies);
        console.log('Session ID:', req.sessionID);
        console.log('Session:', req.session);
        next();
    });

    // 5. API Routes
    const apiRouter = express.Router();

    // Test endpoint
    apiRouter.get('/test-cookie', (req, res) => {
        console.log('Test cookie endpoint hit');
        res.json({
            message: 'Cookie set successfully',
            sessionId: req.sessionID,
            session: req.session,
            cookies: req.cookies
        });
    });

    // Mount API router at /api
    app.use('/api', apiRouter);

    // 6. GraphQL Setup
    const schema = await getSchema();
    const prisma = await getMyPrismaClient();

    app.use((req, res, next) => {
        const originalEnd = res.end;

        console.log('\n=== Request Debug ===');
        console.log('URL:', req.url);
        console.log('Method:', req.method);
        console.log('Session ID:', req.sessionID);
        console.log('Raw Cookie:', req.headers.cookie);
        console.log('Parsed Cookies:', req.cookies);
        console.log('Signed Cookies:', req.signedCookies);
        console.log('Session Before:', req.session);

        // Track session changes
    res.end = function(chunk: any, encoding?: BufferEncoding | (() => void), cb?: (() => void)) {
        if (typeof encoding === 'function') {
            cb = encoding;
            encoding = undefined;
        }
        console.log('\n=== Response Debug ===');
        console.log('Final Session:', req.session);
        return originalEnd.call(this, chunk, encoding ?? 'utf-8', cb);
    }
    next();
});

// Add test endpoints for debugging
    app.post('/test-set-session', (req, res) => {
        req.session.userId = 'test-user-id';

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                res.status(500).json({ error: 'Failed to save session' });
                return;
            }

            console.log('Session after save:', {
                id: req.sessionID,
                data: req.session
            });

            res.json({
                message: 'Session data set',
                sessionId: req.sessionID,
                session: req.session
            });
        });
    });

    app.get('/test-get-session', (req, res) => {
        console.log('Current session:', {
            id: req.sessionID,
            data: req.session
        });

        res.json({
            sessionId: req.sessionID,
            session: req.session,
            rawCookie: req.headers.cookie,
            parsedCookies: req.cookies,
            signedCookies: req.signedCookies
        });
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }): IMyContext => ({
            req,
            res,
            prisma,
            session: req.session
        }),
        introspection: true,
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        cors: false,
        path: '/graphql'
    });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`API Server running on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});