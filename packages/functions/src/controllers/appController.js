import {publishCreateMetafield} from '@functions/handlers/pubsub/publishers';
import {getCurrentShopData} from '@functions/helpers/auth';

export async function createInitAfterLogin(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    console.log('SHOPDATA:', shopData);

    const messageId = await publishCreateMetafield({
      shopifyDomain: shopData.domain
    });

    console.log('Published messageId:', messageId);
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: error.message
    };
    console.log(error);
  }
}
