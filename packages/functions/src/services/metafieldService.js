import {STAR_KEY_MAP} from '@functions/const/app';
import * as metafieldRepository from '@functions/repositories/metafieldRepository';
import {logger} from 'firebase-functions/v2';

/**
 *
 * @param {Shop} shopData
 * @returns {Promise<void>}
 */
export async function createMetafield(shopData) {
  const existed = await checkExistMetafield(shopData);

  if (existed) {
    logger.info('Metafield already exists');
    return;
  }

  await metafieldRepository.save(shopData);
  logger.info('Create metafield successfully');
}

/**
 * Update status review and update metafield product
 * Get the current metafield value of the product
 * Update value by status
 * Recalculate the value of averageRating and ratingCount
 * If average rating and rating count < 0. The rating metafield will be deleted
 *
 * @param {Shop} shopData
 * @param {ICreateAndUpdateReview} data
 * @param {string} status
 *
 * @returns {Promise<void>}
 */
export async function updateStatusReview(shopData, data, status) {
  const {productId, rate} = data;

  const key = STAR_KEY_MAP[rate];
  const value = await getMetafieldProduct(shopData, productId);

  if (status === 'published') {
    value.reviewSummary[key].unpublished -= 1;
    value.reviewSummary[key].published += 1;

    value.reviews[value.reviews.length] = data;
  }
  if (status === 'unpublished') {
    value.reviews = value.reviews.filter(review => review.id !== data.id);

    value.reviewSummary[key].unpublished += 1;
    value.reviewSummary[key].published -= 1;
  }

  const reviewSummary = value.reviewSummary;

  const ratingCount = await getTotalReview(reviewSummary);
  const ratingScore = getRatingScore(reviewSummary);
  const averageRating = ratingCount > 0 ? ratingScore / ratingCount : 0;

  const metafields = [
    {
      key: 'data',
      namespace: 'reviews_product',
      ownerId: `gid://shopify/Product/${productId}`,
      type: 'json',
      value: JSON.stringify(value)
    },
    {
      ownerId: `gid://shopify/Product/${productId}`,
      namespace: 'reviews',
      key: 'rating_count',
      type: 'number_integer',
      value: `${ratingCount}`
    }
  ];

  if (averageRating >= 1 && ratingCount > 0) {
    metafields.push({
      ownerId: `gid://shopify/Product/${productId}`,
      namespace: 'reviews',
      key: 'rating',
      type: 'rating',
      value: JSON.stringify({
        scale_min: 1.0,
        scale_max: 5.0,
        value: averageRating
      })
    });
  } else {
    await deleteMetafield(shopData, productId);
  }

  await metafieldRepository.updateOne(shopData, metafields);
}

/**
 *
 * @param {Shop} shopData
 * @param {number} productId
 * @param {number} rate
 *
 * @returns {Promise<void>}
 */
export async function createMetafieldProduct(shopData, productId, rate) {
  const value = await getMetafieldProduct(shopData, productId);

  const key = STAR_KEY_MAP[rate];

  value.reviewSummary[key].unpublished += 1;

  const metafields = [
    {
      key: 'data',
      namespace: 'reviews_product',
      ownerId: `gid://shopify/Product/${productId}`,
      type: 'json',
      value: JSON.stringify(value)
    }
  ];

  await metafieldRepository.updateOne(shopData, metafields);

  logger.info('Success');
}

/**
 *
 * @param {Shop} shopData
 *
 * @returns {Promise<boolean>}
 */
export async function checkExistMetafield(shopData) {
  const result = await metafieldRepository.findOne(shopData);

  if (!result) return false;

  if (!result.metafieldDefinitions) return false;

  return result.metafieldDefinitions.nodes.length > 0;
}

/**
 *
 * @param {Shop} shopData
 * @param {number} productId
 * @returns {Promise<IMetafieldProduct>}
 */
export async function getMetafieldProduct(shopData, productId) {
  const data = await metafieldRepository.findByProducyId(shopData, productId);

  const value = data?.product?.metafield?.value;

  if (!value) {
    return createEmptyMetafield();
  }

  return JSON.parse(value);
}

/**
 *
 * @param {Shop} shopData
 * @param {number} productId
 *
 * @returns {Promise<void>}
 */
async function deleteMetafield(shopData, productId) {
  const metafields = [
    {
      ownerId: `gid://shopify/Product/${productId}`,
      namespace: 'reviews',
      key: 'rating'
    }
  ];
  await metafieldRepository.deleteMetafield(shopData, metafields);
}

function createEmptyMetafield() {
  return {
    reviews: [],
    reviewSummary: {
      five_star: {published: 0, unpublished: 0},
      four_star: {published: 0, unpublished: 0},
      three_star: {published: 0, unpublished: 0},
      two_star: {published: 0, unpublished: 0},
      one_star: {published: 0, unpublished: 0}
    }
  };
}

function getTotalReview(reviewSummary) {
  return Object.values(reviewSummary).reduce((sum, starObj) => sum + (starObj.published ?? 0), 0);
}

function getRatingScore(reviewSummary) {
  return [1, 2, 3, 4, 5].reduce((sum, star) => {
    const key = STAR_KEY_MAP[star];
    return sum + star * (reviewSummary[key]?.published ?? 0);
  }, 0);
}
