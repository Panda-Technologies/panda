import { User } from "@prisma/client";
import { mutationType, stringArg } from "nexus";
import { IMyContext, ISession } from "../interface";
import { hashPassword, isAuthenticated, verifyPassword } from "../utils";
import { INVALID_CREDENTIALS, NOT_AUTHENTICATED, NOT_AUTHORIZED } from "../constants";

export const Mutation = mutationType({
    definition(t){
        t.boolean('loginUser', {
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async (_, { ...userDetails }: Pick<User, 'email' | 'password'>, {prisma, session}: IMyContext) => {
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
            },
        }),

        t.boolean('registerUser', {
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async (_, { ...userDetails }: Omit<User, 'id'>, {prisma}: IMyContext) => {
                try {
                    const hashedPassword = await hashPassword(userDetails.password);
                    await prisma.user.create({data: {
                        ...userDetails,
                        password: hashedPassword,
                    }
                });

                return true;
                } catch (err: any) {
                    const errorCaught = err as any
                    if (err.code === 'P2002') {
                        const errorMessage = errorCaught.meta.target.toString();
                        return new Error(`The ${errorMessage} is already taken`);
                    } else {
                        return new Error(errorCaught.message);
                    }
                }
            },
        }),
        t.boolean('logoutUser', {
            resolve: (_, __, session: ISession) => {
                if (!isAuthenticated(session)) {
                    return new Error(NOT_AUTHENTICATED);
                }
                session.destroy((err) => {
                    console.log(`Error destroying session: ${err}`);
                });
                return true; 
            },
        })
    }
})
