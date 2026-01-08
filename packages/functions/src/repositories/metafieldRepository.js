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
    // : [
    //   {
    //     key: 'data',
    //     namespace: 'reviews_product',
    //     ownerId: `gid://shopify/Product/${productId}`,
    //     type: 'json',
    //     value: JSON.stringify(reviews)
    //   },
    //   {
    //     ownerId: `gid://shopify/Product/${productId}`,
    //     namespace: 'reviews',
    //     key: 'rating',
    //     type: 'rating',
    //     value: `{"scale_min":1.0,"scale_max":5.0,"value":${rating}}`
    //   },
    //   {
    //     ownerId: `gid://shopify/Product/${productId}`,
    //     namespace: 'reviews',
    //     key: 'rating_count',
    //     type: 'number_integer',
    //     value: ratingCount
    //   }
    // ]
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
