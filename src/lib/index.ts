import { Request, Response, Router } from "express";
import { TResponseTemplate, TRoute } from "./types";
import { sqlErrorHandler } from '../helpers/error-handlers';
import { _CANT_SEND_MAIL_ } from '../helpers/error-codes';
import { RequestHandler } from 'express';



export function createController(body: (req: Request, res: Response) => any): RequestHandler {
  return async (req: Request, res: Response) => {
    const result: TResponseTemplate = getResponseTemplate();
    try {
      result.data = (await body(req, res)) || {};
    }
    catch (e) {
      console.log(`error`, e);
      let err: any = e;
      if (err.isSql)
        sqlErrorHandler(err, result);
      else
        result.meta.error = {
          code: err.code || err.errCode || 5000,
          message: err.message || err.errMessage || "Unknown Error"
        };
      result.meta.status = err.status || 500;
    }
    res.status(result.meta.status).json(result);
  };
};

export function getResponseTemplate(): TResponseTemplate {
  return {
    meta: {
      error: null,
      status: 200
    },
    data: {}
  };
};

export function setupRouter(apiRoutes: TRoute[], router: Router) {
  for (let i = 0; i < apiRoutes.length; i++) {
    const midl: RequestHandler[] = [];
    const route = apiRoutes[i];
    if (route.middlewares && route.middlewares.length > 0) {
      midl.push(...route.middlewares);
    }
    router.use(route.path, ...midl, route.router);
  }
}




