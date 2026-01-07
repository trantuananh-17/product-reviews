import * as reviewRepository from '@functions/repositories/reviewRepository';
import * as shopRepository from '@functions/repositories/shopRepository';
import * as metafieldService from '@functions/services/metafieldService';

export async function getReviews(shopId, softBy, limit, page, after, before) {
  console.log({shopId, softBy, limit, page, after, before});

  if (!after && !before) {
    const [reviews, total] = await Promise.all([
      reviewRepository.findAll(shopId, softBy, limit, page, after, before),
      reviewRepository.getCountTotalDocs(shopId)
    ]);

    const {data, pageInfo} = reviews;

    return {
      data,
      pageInfo,
      total
    };
  }

  if (after) {
  }

  if (before) {
  }
}

export async function createReview(shopifyDomain, data) {
  const {productId, rate} = data;
  const shopData = await shopRepository.getShopByShopifyDomain(shopifyDomain);

  const review = await reviewRepository.save(data, shopData.id, shopData.shopifyDomain);

  await metafieldService.createMetafieldProduct(shopData, productId, rate);

  return review;
}

export async function updateStatusReview(shopData, id, status) {
  await reviewRepository.updateOne(id, {status});

  const review = await reviewRepository.findOne(id);

  if (!review) {
    throw new Error('Reviews not found');
  }

  await metafieldService.updateStatusProduct(shopData, review, status);

  return review;
}
