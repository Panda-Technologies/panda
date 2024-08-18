import { User } from "@prisma/client";
import { IMyContext } from "../../interface";
import { hashPassword } from "../../utils";

export const registerResolve = async (_: any, { ...userDetails }: Omit<User, 'id'>, {prisma}: IMyContext) => {
    try {
        const hashedPassword = await hashPassword(userDetails.password);
        const newUser = await prisma.user.create({
            data: {
                ...userDetails,
                password: hashedPassword,
            }
        });

        return newUser.id;
    } catch (err: any) {
        const errorCaught = err as any
        if (err.code === 'P2002') {
            const errorMessage = errorCaught.meta.target.toString();
            throw new Error(`The ${errorMessage} is already taken`);
        } else {
            throw new Error(errorCaught.message);
        }
    }
}