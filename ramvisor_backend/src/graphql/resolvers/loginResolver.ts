import { user } from "@prisma/client";
import { IMyContext, ISession } from "../../interface";
import { isAuthenticated, verifyPassword } from "../../utils";
import { INVALID_CREDENTIALS, NOT_AUTHENTICATED, NOT_AUTHORIZED } from "../../constants";

export const loginResolve = async (_: any, { input }: { input: Pick<user, 'email' | 'password'> },  {prisma, session}: IMyContext) => {
    const { email, password } = input;

    try {
        if (isAuthenticated(session)) {
            throw new Error(NOT_AUTHORIZED);
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (!user) {
            throw new Error(INVALID_CREDENTIALS);
        }

        const isCorrectPassword = await verifyPassword(password, user.password);

        if (!isCorrectPassword) {
            throw new Error(INVALID_CREDENTIALS);
        }

        session.userId = user.id;

        await (async () => {
            console.log('User ID set in session:', session.userId);
            console.log('Full session object:', session);

            try {
                await new Promise<void>((resolve, reject) => {
                    session.save((err) => {
                        if (err) {
                            console.error('Session save error:', err);
                            reject(err);
                        }
                        console.log('Session saved successfully. Session state:', session.userId);
                        resolve();
                    });
                });
            } catch (error) {
                console.error('Error saving session:', error);
            }
        })();

        return user.id;

    } catch (err: any) {
        const errorCaught = err as any
        console.error('Login error:', errorCaught);
        throw new Error(errorCaught.message);
    }
}

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