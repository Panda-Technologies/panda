import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { makeSchema, objectType, queryField, mutationField, stringArg, intArg } from 'nexus';
import { join } from 'path';
import fetch from 'node-fetch';

dotenv.config();

// Prisma Client
const prisma = new PrismaClient();

// GraphQL Object Types
const Course = objectType({
    name: 'Course',
    definition(t) {
        t.int('id');
        t.string('name');
        t.string('courseCode');
        t.string('description');
        t.string('term');
        t.list.field('assignments', { type: 'Assignment' });
    },
});

const Assignment = objectType({
    name: 'Assignment',
    definition(t) {
        t.int('id');
        t.string('name');
        t.string('description');
        t.string('dueAt');
        t.float('pointsPossible');
        t.field('course', { type: 'Course' });
    },
});

// GraphQL Mutations
const GetCanvasAccessToken = mutationField('getCanvasAccessToken', {
    type: 'Boolean',
    args: {
        code: stringArg(),
        redirectUri: stringArg(),
    },
    async resolve(_parent, { code, redirectUri }, ctx) {
        const clientId = process.env.CANVAS_CLIENT_ID;
        const clientSecret = process.env.CANVAS_CLIENT_SECRET;

        // Fetch access token from Canvas
        const response = await fetch('https://canvas.instructure.com/login/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: code,
                grant_type: 'authorization_code',
            }),
        });

        const data = await response.json();
        const token = data.access_token;

        // Store the token in the user's Prisma record
        await ctx.prisma.user.update({
            where: { id: ctx.userId },
            data: { canvasToken: token },
        });

        return true;
    },
});

// GraphQL Queries
const GetCourses = queryField('getCourses', {
    type: 'Course',
    list: true,  // Defines that it returns a list of courses
    async resolve(_parent, _args, ctx) {
        const token = ctx.user.canvasToken;
        if (!token) throw new Error('User is not authenticated with Canvas');

        // Fetch courses from Canvas API using fetch
        const response = await fetch('https://canvas.instructure.com/api/v1/courses', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const courses = await response.json();
        return courses;  // Return courses
    },
});

const GetCourseAssignments = queryField('getCourseAssignments', {
    type: 'Assignment',
    list: true,  // Defines that it returns a list of assignments
    args: {
        courseId: intArg(),
    },
    async resolve(_parent, { courseId }, ctx) {
        const token = ctx.user.canvasToken;
        if (!token) throw new Error('User is not authenticated with Canvas');

        // Fetch assignments for the course from Canvas API using fetch
        const response = await fetch(`https://canvas.instructure.com/api/v1/courses/${courseId}/assignments`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await response.json();
    },
});

// Context
const createContext = ({ req }) => {
    const userId = req.session?.userId;
    return { prisma, userId };
};

// GraphQL Schema
const schema = makeSchema({
    types: [Course, Assignment, GetCanvasAccessToken, GetCourses, GetCourseAssignments],
    outputs: {
        schema: join(__dirname, '/generated/schema.graphql'),
        typegen: join(__dirname, '/generated/nexus.ts'),
    },
});

// Apollo Server and Express Setup
const main = async () => {
    const app = express();

    app.use(session({
        secret: process.env.SESSION_SECRET!,
        name: 'canvas-api',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        }
    }) as express.RequestHandler);

    const apolloServer = new ApolloServer({
        schema,
        context: createContext,
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});
