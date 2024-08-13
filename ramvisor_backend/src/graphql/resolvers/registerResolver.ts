import { User } from "@prisma/client";
import { IMyContext } from "../../interface";
import { hashPassword } from "../../utils";

export const registerResolve = async (_: any, { ...userDetails }: Omit<User, 'id'>, {prisma}: IMyContext) => {
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
}