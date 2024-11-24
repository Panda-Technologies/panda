import { user } from "@prisma/client";
import { IMyContext, ISession } from "../../interface";
import { isAuthenticated, verifyPassword } from "../../utils";
import { INVALID_CREDENTIALS, NOT_AUTHENTICATED } from "../../constants";

export const loginResolve = async (
    _: any,
    { input }: { input: Pick<user, 'email' | 'password'> },
    { prisma, session, req }: IMyContext
) => {
    console.log('\n=== Login Attempt ===');
    console.log('Initial Session:', req.session);

    try {
        const user = await prisma.user.findUnique({
            where: { email: input.email }
        });

        if (!user) {
            throw new Error(INVALID_CREDENTIALS);
        }

        const isCorrectPassword = await verifyPassword(input.password, user.password);

        if (!isCorrectPassword) {
            throw new Error(INVALID_CREDENTIALS);
        }

        // Set session data
        session.userId = user.id;

        // Save session explicitly
        await new Promise<void>((resolve, reject) => {
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    reject(err);
                }
                console.log('\n=== Session After Save ===');
                console.log('Session ID:', req.sessionID);
                console.log('Session Data:', req.session);
                console.log('User ID in session:', req.session.userId);
                resolve();
            });
        });

        return user.id;
    } catch (err: any) {
        console.error('Login error:', err);
        throw new Error(err.message);
    }
};

export const logoutResolve = (_: any, __: any, session: ISession) => {
    if (!isAuthenticated(session)) {
        throw new Error(NOT_AUTHENTICATED);
    }

    (async () => {
        try {
            await new Promise<void>((resolve, reject) => {
                session.destroy((err) => {
                    if (err) {
                        console.error('Error destroying session:', err);
                        reject(err);
                    }
                    console.log('Session destroyed successfully');
                    resolve();
                });
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    })();

    return true;
}