import { TResponseTemplate } from '../lib/types';
import DB_CONSTRAINTS from '../providers/db/db-constants';
import { internal_errors } from './error-codes';



export function sqlErrorHandler(err: any, result: TResponseTemplate): void {

    const currentError = internal_errors.find(el => el.code === err.errCode);
    if (currentError) {
        result.meta.error = { code: currentError.code, message: currentError.message };
        result.meta.status = currentError.status;

        if(currentError.code === 1062 )
            for (const constraint in DB_CONSTRAINTS) {
                if (err.errMessage && err.errMessage.indexOf(constraint) != -1) {
                    result.meta.error.code = +(result.meta.error.code + "" + DB_CONSTRAINTS[constraint]);
                    break;
                }
            }
    }else result.meta.error = { code: 1111, message: err.errMessage || "SQL ERROR" };

}

