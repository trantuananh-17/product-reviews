import * as reviewRepository from '@functions/repositories/reviewRepository';
import * as shopRepository from '@functions/repositories/shopRepository';
import * as metafieldService from '@functions/services/metafieldService';

export async function getReviews(shopId, softBy, filter) {}

export async function createReview(shopifyDomain, data) {
  const {productId, rate} = data;
  const shopData = await shopRepository.getShopByShopifyDomain(shopifyDomain);

  const review = await reviewRepository.save(data, shopData.id, shopData.shopifyDomain);

  await metafieldService.updateMetafieldProduct(shopData, productId, rate);

  return review;
}
