import { TError } from '../lib/types';
 
export const _WRONG_PARAMS_:TError = {  code: 4060 , message: `Անթույլատրելի պարամետրեր`, status: 406 };
export const _VALIDATION_ERROR_:TError = {  code: 4061 , message: `Վալիդացիայի ձախողում`, status: 406 };
export const _WRONG_LOGIN_OR_PASSWORD:TError = { code: 4010 , message: `Սխալ ծածկանուն կամ գաղտնաբառ`, status: 401};
export const _NOT_AVAILABLE_TO_USER_:TError = { code: 4031, message: `Օգտատիրոջը հասանելի չէ`, status: 403 };
export const _RESOURCE_NOT_FOUND_:TError = { code: 4041 , message: `Հասցեն չի գտնվել`, status: 404  };
export const _TOKEN_IS_WRONG_:TError = { code: 4030, message: `Վավերացման ձախողում`, status: 403};
export const _RESET_CODE_IS_WRONG_:TError = { code: 4062, message: `Reset code is wrong`, status: 406 };
export const _OLD_PASSWORD_IS_WRONG_:TError = { code: 4063, message: `Old password is wrong`, status: 406 };

    // _USER_NOT_FOUND_:TError = { code: 4041,  message: `Օգտատեր չի գտնվել` };
export const _USER_DOES_NOT_HAVE_ACCESS_:TError = { code: 4032, message: `Օգտատերը իրավունք չունի`, status: 403 };
export const _CANT_SEND_MAIL_:TError = { code: 1444 , message: `Նամակը հաջողությամբ չի ուղարկվել`, status: 500 }; 
export const _TECHNICAL_DIFFICULTIES_:TError = { code: 5000, message: `Technical Difficulties`, status: 500 };



export const internal_errors: TError[] =  [
    { code: 1062 , message: `Կրկնության սխալ, դաշտը ունիկալ է`, status: 400 },
    { code: 1054 , message: `Դաշտի ցանկի սխալ անվանում`, status: 505 },
    { code: 4078 , message: `Բազայի հետ կապի ձախողում`, status: 505},
    { code: 1064 , message: `SQL սինտաքսի սխալ`, status: 505}, 
    { code: 1146 , message: `Table 'db.undefined' doesn't exist`, status: 505}
];