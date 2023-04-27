import jwt from "jsonwebtoken";
import {IUser} from "@/shared/api/user/model";

export const getDecodedAccessToken = (token: string): IUser => {
    try {
        const payload = jwt.decode(token);
        return payload as IUser;
    } catch (Error) {
        return null;
    }
}