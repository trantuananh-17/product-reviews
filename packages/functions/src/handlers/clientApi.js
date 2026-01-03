import App from 'koa';
import * as errorService from '@functions/services/errorService';
import router from '@functions/routes/clientApi';
import cors from '@koa/cors';

const api = new App();
api.proxy = true;

api.use(cors());
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
