import {getCurrentShopData} from '@functions/helpers/auth';
import * as metafieldService from '@functions/services/metafieldService';

export async function createInitAfterLogin(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    await metafieldService.createMetafield(shopData);

    await metafieldService.updateMetafield(shopData);
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: error.message
    };
    console.log(error);
  }
}
