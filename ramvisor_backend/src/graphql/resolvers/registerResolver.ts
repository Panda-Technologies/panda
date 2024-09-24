import { user } from "@prisma/client";
import { IMyContext } from "../../interface";
import { hashPassword } from "../../utils";
import { generateUUID } from "../../utils";

export const registerResolve = async (_: any, { input }: { input: Omit<user, 'id'> }, { prisma }: IMyContext) => {
    try {
        const { email, password } = input;

        if (!email || !password) {
            throw new Error("Email and Password are required");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                id: generateUUID(),
                email: input.email,
                password: hashedPassword,
            },
        });

        return newUser.id;

    } catch (err: any) {
        if (err.code === 'P2002') {
            const errorMessage = err.meta.target.toString();
            throw new Error(`The ${errorMessage} is already taken`);
        } else {
            throw new Error(err.message);
        }
    }
};