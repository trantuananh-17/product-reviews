import {getCurrentShopData} from '@functions/helpers/auth';
import publishTopic from '@functions/helpers/pubsub/publishTopic';

export async function createInitAfterLogin(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    await publishTopic('create-metafield-definition-product', {
      shopifyDomain: shopData.domain
    });
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: error.message
    };
    console.log(error);
  }
}
