import publishTopic from '@functions/helpers/pubsub/publishTopic';
import * as reviewRepository from '@functions/repositories/reviewRepository';
import * as shopRepository from '@functions/repositories/shopRepository';

/**
 * Get reviews for admin app
 *
 * @param {string} shopId
 * @param {string} softBy
 * @param {number} limit
 * @param {number} page
 * @param {string} after
 * @param {string} before
 * @returns {Promise<{ data: IReview[], pageInfo: IPageInfo, total: number }>}
 */
export async function getReviews(shopId, softBy, limit, page, after, before) {
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

/**
 * Create review by customer on the storefront
 *
 * @param {string} shopifyDomain
 * @param {ICreateReview} data
 * @returns {IReview>}
 */
export async function createReview(shopifyDomain, data) {
  const {productId, rate} = data;

  const shopData = await shopRepository.getShopByShopifyDomain(shopifyDomain);

  const review = await reviewRepository.save(data, shopData.id, shopData.shopifyDomain);

  await publishTopic('create-metafield-product', {
    shopifyDomain: shopData.domain,
    productId,
    rate
  });

  return review;
}

/**
 *
 * @param {Shop} shopData
 * @param {string} id
 * @param {string} status
 * @returns {Promise<IReview>}
 */
export async function updateStatusReview(shopData, id, status) {
  const review = await reviewRepository.findOne(id);

  if (!review) {
    throw new Error('Reviews not found');
  }

  await reviewRepository.updateOne(id, {status});

  await publishTopic('update-metafield-product', {
    shopifyDomain: shopData.domain,
    review,
    status
  });

  return review;
}
