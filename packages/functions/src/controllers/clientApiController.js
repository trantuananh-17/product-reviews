import * as reviewService from '@functions/services/reviewService';

export async function createReview(ctx) {
  try {
    const shopifyDomain = ctx.headers['x-shop-domain'];

    const requestBody = ctx.req.body;

    const resp = await reviewService.createReview(shopifyDomain, requestBody);

    ctx.status = 201;
    ctx.body = {
      success: true,
      data: resp
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: error.message
    };
    console.log(error);
  }
}
