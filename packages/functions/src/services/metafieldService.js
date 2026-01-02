import * as metafieldRepository from '@functions/repositories/metafieldRepository';

export async function createMetafield(shopData) {
  await checkExistMetafield(shopData);

  await metafieldRepository.save(shopData);

  console.log('Create metafield successfully');
}

export async function checkExistMetafield(shopData) {
  const metafieldExist = await metafieldRepository.findOne(shopData);

  if (metafieldExist) {
    console.log(JSON.stringify(metafieldExist));
    return;
  }
}

export async function updateMetafield(shopData) {
  await metafieldRepository.updateOne(shopData);

  console.log('success');
}
