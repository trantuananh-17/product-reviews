import * as metafieldRepository from '@functions/repositories/metafieldRepository';

const STAR_KEY_MAP = {
  5: 'five_star',
  4: 'four_star',
  3: 'three_star',
  2: 'two_star',
  1: 'one_star'
};

export async function createMetafield(shopData) {
  await checkExistMetafield(shopData);

  await metafieldRepository.save(shopData);

  console.log('Create metafield successfully');
}

export async function updateStatusProduct(shopData, data, status) {
  const {productId, rate} = data;

  const key = STAR_KEY_MAP[rate];
  const value = await getMetafieldByProduct(shopData, productId);

  if (status === 'published') {
    value.reviewSummary[key].unpublished -= 1;
    value.reviewSummary[key].published += 1;

    value.reviews[value.reviews.length] = data;
  } else {
    value.reviews = value.reviews.filter(review => review.id !== data.id);
    value.reviewSummary[key].unpublished += 1;
    value.reviewSummary[key].published -= 1;
  }

  await this.updateMetafield(shopData, productId, value);
}

export async function createMetafieldProduct(shopData, productId, rate) {
  const value = await getMetafieldByProduct(shopData, productId);

  const key = STAR_KEY_MAP[rate];

  value.reviewSummary[key].unpublished += 1;

  await this.updateMetafield(shopData, productId, value);

  console.log('Success');
}

export async function checkExistMetafield(shopData) {
  const metafieldExist = await metafieldRepository.findOne(shopData);

  if (metafieldExist) {
    console.log(JSON.stringify(metafieldExist));
    return;
  }
}

export async function updateMetafield(shopData, productId, value) {
  await metafieldRepository.updateOne(shopData, productId, value);

  console.log('success');
}

export async function getMetafieldByProduct(shopData, productId) {
  const data = await metafieldRepository.findByProducyId(shopData, productId);

  const value = data?.product?.metafield?.value;

  if (!value) {
    return createEmptyMetafield();
  }

  return JSON.parse(value);
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
