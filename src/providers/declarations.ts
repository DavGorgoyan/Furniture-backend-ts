import { TDictionary } from './../lib/types';
import { JwtPayload } from 'jsonwebtoken';
declare global {
    namespace Express {
        export interface Request {
            fromMiddleware?: TDictionary,
            tokenData?: JwtPayload | {
                uid: string
            } ,
            user?: TDictionary;
        }
    }
}
export default function () {
    console.log('declarations in');
}