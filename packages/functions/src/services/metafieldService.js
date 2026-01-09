import * as metafieldRepository from '@functions/repositories/metafieldRepository';

const STAR_KEY_MAP = {
  5: 'five_star',
  4: 'four_star',
  3: 'three_star',
  2: 'two_star',
  1: 'one_star'
};

/**
 *
 * @param {Shop} shopData
 * @returns {Promise<void>}
 */
export async function createMetafield(shopData) {
  await checkExistMetafield(shopData);

  await metafieldRepository.save(shopData);

  console.log('Create metafield successfully');
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

  const reviewSumary = value.reviewSummary;

  const ratingCount = await getTotalReview(reviewSumary);
  const ratingScore = getRatingScore(reviewSumary);
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

  await updateMetafield(shopData, metafields);
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

  await updateMetafield(shopData, metafields);

  console.log('Success');
}

/**
 *
 * @param {Shop} shopData
 *
 * @returns {Promise<void>}
 */
export async function checkExistMetafield(shopData) {
  const metafieldExist = await metafieldRepository.findOne(shopData);

  if (metafieldExist) {
    console.log(JSON.stringify(metafieldExist));
    return;
  }
}

/**
 *
 * @param {Shop} shopData
 * @param {any} metafields
 *
 * @returns {Promise<void>}
 */
export async function updateMetafield(shopData, metafields) {
  await metafieldRepository.updateOne(shopData, metafields);

  console.log('success');
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

function getTotalReview(reviewSumary) {
  return Object.values(reviewSumary).reduce((sum, starObj) => sum + (starObj.published ?? 0), 0);
}

function getRatingScore(reviewSumary) {
  return [1, 2, 3, 4, 5].reduce((sum, star) => {
    const key = STAR_KEY_MAP[star];
    return sum + star * (reviewSumary[key]?.published ?? 0);
  }, 0);
}
