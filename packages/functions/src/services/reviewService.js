import {generateShopifyProductGid} from '@functions/helpers/metafield/convertId';
import publishTopic from '@functions/helpers/pubsub/publishTopic';
import * as reviewRepository from '@functions/repositories/reviewRepository';
import * as shopRepository from '@functions/repositories/shopRepository';
import * as productRepository from '@functions/repositories/productRepository';

/**
 * Get reviews for admin app
 *
 * @param shopData
 * @param {string} shopId
 * @param {string} softBy
 * @param {number} limit
 * @param {number} page
 * @param {string} after
 * @param {string} before
 * @returns {Promise<{ data: IReview[], pageInfo: IPageInfo, total: number }>}
 */
export async function getReviews(shopData, shopId, softBy, limit, page, after, before) {
  if (!after && !before) {
    const [reviews, total] = await Promise.all([
      reviewRepository.findAll(shopId, softBy, limit, page, after, before),
      reviewRepository.getCountTotalDocs(shopId)
    ]);

    const productIds = [...new Set(reviews.data.map(r => generateShopifyProductGid(r.productId)))];

    console.log(productIds);

    const products = await productRepository.getByIds(shopData, productIds);

    console.log(products);

    if (!products) {
      throw new Error('Not found product');
    }

    const data = mergeInfo(reviews.data, products);

    const {pageInfo} = reviews;

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


function mergeInfo(reviews, products) {
  const productMap = new Map(products.map(p => [p.id, p]));

  return reviews.map(review => {
    const gid = `gid://shopify/Product/${review.productId}`;
    const product = productMap.get(gid);

    return {
      ...review,
      productTitle: product.title,
      productImage: product.featuredImage.url,
      productHandle: product.handle
    };
  });
}
