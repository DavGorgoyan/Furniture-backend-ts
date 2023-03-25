import { Router } from 'express';
import { TRoute } from './../lib/types';
import { setupRouter } from '../lib';

import appRouter from './app';

const router: Router = Router();


const apiRoutes: TRoute[] = [
    { path: `/app`, router: appRouter },
]

setupRouter(apiRoutes, router);

export default router;
