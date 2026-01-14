import {getCurrentShop, getCurrentShopData} from '@functions/helpers/auth';
import * as reviewService from '@functions/services/reviewService';

export async function getReviews(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const shopData = getCurrentShopData(ctx);
    const {limit = 10, page = 10, softBy, after, before} = ctx.params;

    const {data, pageInfo, total} = await reviewService.getReviews(
      shopData,
      shopId,
      softBy,
      Number(limit),
      Number(page),
      after,
      before
    );

    ctx.status = 200;
    ctx.body = {
      data: {
        data,
        pagination: {
          total,
          ...pageInfo
        }
      }
    };
  } catch (error) {
    console.error(error);
    ctx.status = 404;
    ctx.body = {success: false};
  }
}

export async function updateStatusReview(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    const {id, status} = ctx.req.body;

    const resp = await reviewService.updateStatusReview(shopData, id, status);

    ctx.status = 200;
    ctx.body = {
      data: resp
    };
  } catch (error) {
    console.error(error);
    ctx.status = 404;
    ctx.body = {success: false};
  }
}
