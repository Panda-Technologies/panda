// index.ts
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { getSchema } from './graphql/schema';
import { getMyPrismaClient } from './db';
import { IMyContext } from './interface';
import RedisStore from 'connect-redis';
import Redis from "ioredis";

const main = async () => {
    const app = express();

    // 0. Redis configuration
    const redisClient = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false
    });

    const cleanup = async () => {
        console.log('Cleaning up...');
        await redisClient.quit();
        process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    // Handle Redis connection errors
    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
        console.log('Connected to Redis successfully');
    });

    // 1. Basic middleware
    app.use(express.json());
    app.use(cookieParser(process.env.SESSION_SECRET));

    // 2. CORS configuration
    app.use(cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5001',
            'https://studio.apollographql.com',
            'https://uncch.instructure.com',
            'chrome-extension://nnpfiflmamolaflafofhhppmadcgcnhf'
        ],
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        exposedHeaders: ['Set-Cookie']
    }));

    // 3. Redis store configuration
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: "myapp:",
        ttl: 14 * 24 * 60 * 60, // Session TTL (14 days)
    });

    // 3.1 Session configuration
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
            maxAge: 24 * 60 * 60 * 1000 * 14, // 2 weeks
            domain: 'localhost',
        },
        store: redisStore,
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

    // Add session debugging middleware
    app.use((req, _, next) => {
        const debugSession = async () => {
            try {
                // Get raw Redis data for the session
                const redisKey = `myapp:${req.sessionID}`;
                const rawSession = await redisClient.get(redisKey);

                console.log('\n=== Session Debug ===');
                console.log('Session ID:', req.sessionID);
                console.log('Session:', req.session);
                console.log('Raw Redis Session:', rawSession);
                console.log('TTL:', await redisClient.ttl(redisKey));
            } catch (err) {
                console.error('Session debug error:', err);
            }
        };

        debugSession();
        next();
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
    // Update test endpoints to work with Redis
    app.post('/test-set-session', (req, res) => {
        req.session.userId = 'test-user-id';

        req.session.save(async (err) => {
            if (err) {
                console.error('Session save error:', err);
                res.status(500).json({ error: 'Failed to save session' });
                return;
            }

            try {
                const redisKey = `myapp:${req.sessionID}`;
                const rawSession = await redisClient.get(redisKey);
                const ttl = await redisClient.ttl(redisKey);

                res.json({
                    message: 'Session data set',
                    sessionId: req.sessionID,
                    session: req.session,
                    redisData: {
                        raw: rawSession,
                        ttl: ttl
                    }
                });
            } catch (err) {
                console.error('Redis error:', err);
                res.status(500).json({ error: 'Redis error' });
            }
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
            session: req.session,
            redis: redisClient
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