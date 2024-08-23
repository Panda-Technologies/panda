import Argon from 'argon2'
import { ISession } from './interface';
import { v4 as uuidv4 } from 'uuid';

export const hashPassword = async (password: string): Promise<string> => {
        const hashedPassword = await Argon.hash(password);
        return hashedPassword;
};

export const verifyPassword = async(password: string, hashedPassword: string) => {
    const isCorrect = await Argon.verify(hashedPassword, password) as boolean;
    return isCorrect;
};

export const isProd = () => process.env.NODE_ENV === 'production';

export const isAuthenticated = (session: ISession): boolean => {if (!session.userId) {
    return false;
} else {
    return true;
}};

export const generateUUID = (): string => {
    return uuidv4();
}