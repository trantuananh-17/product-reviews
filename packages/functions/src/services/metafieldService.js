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

export async function updateMetafieldProduct(shopData, productId, rate) {
  const data = await this.getMetafieldByProduct(shopData, productId);

  let value = JSON.parse(data?.product?.metafield?.value);

  if (!value) {
    value = {
      reviews: [],
      reviewSummary: {
        five_star: {
          published: 0,
          unpublished: 0
        },
        four_star: {
          unpublished: 0,
          published: 0
        },
        three_star: {
          unpublished: 0,
          published: 0
        },
        two_star: {
          unpublished: 0,
          published: 0
        },
        one_star: {
          unpublished: 0,
          published: 0
        }
      }
    };
  }

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
  const value = await metafieldRepository.findByProducyId(shopData, productId);

  console.log(value);

  return value;
}
