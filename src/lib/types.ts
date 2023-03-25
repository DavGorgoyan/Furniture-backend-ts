import { RequestHandler } from "express";

export type TRoute = {
  path: string,
  router: RequestHandler,
  middlewares?: RequestHandler[],
  auth?: boolean
};

export type TResponseTemplate = {
  meta: {
    error: null | {
      code: number,
      message: string,
      info?: any
    },
    status: number
  },
  data: Object
};

export type TError = {
  code: number,
  message: string,
  status: number
}

export type TValidationConfig = {
  required?: boolean,
  isEmail?: boolean,
  minLength?: number,
  maxLength?: number,
  date?: boolean,
  time?: boolean,
  isOneOf?: any[],
  custom?: (value: any) => { valid: boolean, message: string }
};

export type TDictionary = {
  [key: string]: any
};

export type TFile = File & {
  name?: string,
  path: string
}


export type TTransactionParam = [string, (string | number | TDictionary | (string | number | TDictionary)[])[]][];
