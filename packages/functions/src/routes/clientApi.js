import Router from 'koa-router';
import * as clientApiController from '@functions/controllers/clientApiController';

const router = new Router({
  prefix: '/clientApi'
});

router.post('/reviews', clientApiController.createReview);

export default router;
