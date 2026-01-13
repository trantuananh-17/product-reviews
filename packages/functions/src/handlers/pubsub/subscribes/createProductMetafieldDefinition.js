import * as metafieldService from '@functions/services/metafieldService';
import * as shopRepository from '@functions/repositories/shopRepository';

export async function createProductMetafieldDefinition(event) {
  try {
    const message = event.data.message;

    const data = message.data ? JSON.parse(Buffer.from(message.data, 'base64').toString()) : null;

    const shopData = await shopRepository.getShopByShopifyDomain(data.shopifyDomain);

    await metafieldService.createMetafield(shopData);
  } catch (error) {
    console.error(error);
  }
}
