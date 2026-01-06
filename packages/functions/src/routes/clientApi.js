import Router from 'koa-router';
import * as clientApiController from '@functions/controllers/clientApiController';

const router = new Router({
  prefix: '/clientApi'
});

router.post('/reviews', clientApiController.createReview);
router.get('/reviews', ctx => {
  ctx.status = 200;
  ctx.body = {
    message: 'Hello world'
  };
});

export default router;
