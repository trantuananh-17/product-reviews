import * as reviewRepository from '@functions/repositories/reviewRepository';
import * as shopRepository from '@functions/repositories/shopRepository';

export async function getReviews(shopId, softBy, filter) {}

export async function createReview(shopifyDomain, data) {
  const shopData = await shopRepository.getShopByShopifyDomain(shopifyDomain);

  const review = await reviewRepository.save(data, shopData.id, shopData.shopifyDomain);

  return review;
}
