import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';

export async function save(shopData) {
  const shopify = initShopify(shopData);

  const mutation = loadGraphQL('/mutations/metafield.create.graphql');

  const variables = {
    definition: {
      name: shopData.name,
      namespace: 'reviews_product',
      key: 'data',
      description: 'Data for Product Reviews app',
      type: 'json',
      ownerType: 'PRODUCT',
      access: {
        storefront: 'PUBLIC_READ'
      }
    }
  };

  const metafieldGraphql = await shopify.graphql(mutation, variables);

  return metafieldGraphql;
}

export async function findOne(shopData) {
  const shopify = initShopify(shopData);

  const query = loadGraphQL('/queries/metafield.get.graphql');

  const metafieldGraphql = await shopify.graphql(query);

  return metafieldGraphql;
}

export async function updateOne(shopData, metafields) {
  const shopify = initShopify(shopData);

  const mutation = loadGraphQL('/mutations/productMetafield.update.graphql');

  const variables = {
    metafields
  };

  const metafieldGraphql = await shopify.graphql(mutation, variables);

  return metafieldGraphql;
}

export async function findByProducyId(shopData, productId) {
  const shopify = initShopify(shopData);

  const query = loadGraphQL('/queries/productById.graphql');

  const variables = {
    id: `gid://shopify/Product/${productId}`
  };

  const metafieldByProductGraphql = await shopify.graphql(query, variables);

  return metafieldByProductGraphql;
}

export async function deleteMetafield(shopData, metafields) {
  const shopify = initShopify(shopData);

  const mutation = loadGraphQL('/mutations/ratingMetafield.delete.graphql');

  const variables = {
    metafields
  };

  const metafieldGraphql = await shopify.graphql(mutation, variables);

  return metafieldGraphql;
}
