import { User } from "@prisma/client";
import { IMyContext, ISession } from "../../interface";
import { isAuthenticated, verifyPassword } from "../../utils";
import { INVALID_CREDENTIALS, NOT_AUTHENTICATED, NOT_AUTHORIZED } from "../../constants";

export const loginResolve = async (_: any, { input }: { input: Pick<User, 'email' | 'password'> },  {prisma, session}: IMyContext) => {
    const { email, password } = input;
    
    try {
        if (isAuthenticated(session)) {
            throw new Error(NOT_AUTHORIZED);
        }
        const { email, password } = input;

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

        session['userId'] = user.id;

        return user.id;
    } catch (err: any) {
        const errorCaught = err as any
        throw new Error(errorCaught.message);
    }
}

export const logoutResolve = (_: any, __: any, session: ISession) => {
    if (!isAuthenticated(session)) {
        throw new Error(NOT_AUTHENTICATED);
    }
    session.destroy((err) => {
        console.log(`Error destroying session: ${err}`);
    });
    return true; 
}