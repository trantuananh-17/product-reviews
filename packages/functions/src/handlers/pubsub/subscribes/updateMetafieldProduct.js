import * as metafieldService from '@functions/services/metafieldService';
import * as shopRepository from '@functions/repositories/shopRepository';

export async function updateMetafieldProduct(event) {
  try {
    const message = event.data.message;

    const data = message.data ? JSON.parse(Buffer.from(message.data, 'base64').toString()) : null;

    const {shopifyDomain, review, status} = data;

    const shopData = await shopRepository.getShopByShopifyDomain(shopifyDomain);

    await metafieldService.updateStatusReview(shopData, review, status);
  } catch (error) {
    console.error(error);
  }
}
