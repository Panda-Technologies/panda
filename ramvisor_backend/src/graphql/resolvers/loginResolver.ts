import { User } from "@prisma/client";
import { IMyContext, ISession } from "../../interface";
import { isAuthenticated, verifyPassword } from "../../utils";
import { INVALID_CREDENTIALS, NOT_AUTHENTICATED, NOT_AUTHORIZED } from "../../constants";

export const loginResolve = async (_: any, { ...userDetails }: Pick<User, 'email' | 'password'>, {prisma, session}: IMyContext) => {
    try {

        if (isAuthenticated(session)) {
            return new Error(NOT_AUTHORIZED);
        }

        const user = await prisma.user.findUnique({
            where: {
                email: userDetails.email,
            }
        });

        if (!user) {
            return new Error(INVALID_CREDENTIALS);
        }

        const isCorrectPassword = await verifyPassword(userDetails.password, user.password);

        if (!isCorrectPassword) {
            return new Error(INVALID_CREDENTIALS);
        }

        session['userId'] = user.id;

    return true;
    } catch (err: any) {
        const errorCaught = err as any
        return new Error(errorCaught.message);
    }
}

export const logoutResolve = (_: any, __: any, session: ISession) => {
    if (!isAuthenticated(session)) {
        return new Error(NOT_AUTHENTICATED);
    }
    session.destroy((err) => {
        console.log(`Error destroying session: ${err}`);
    });
    return true; 
}
