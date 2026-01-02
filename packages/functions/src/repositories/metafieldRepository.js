import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';

export async function save(shopData) {
  const shopify = await initShopify(shopData);

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
  const shopify = await initShopify(shopData);

  const query = loadGraphQL('/queries/metafield.get.graphql');

  const metafieldGraphql = await shopify.graphql(query);

  return metafieldGraphql;
}

export async function updateOne(shopData) {
  const shopify = await initShopify(shopData);

  const mutation = loadGraphQL('/mutations/productMetafield.update.graphql');

  const variables = {
    metafields: [
      {
        key: 'data',
        namespace: 'reviews_product',
        ownerId: 'gid://shopify/Product/10018120892696',
        type: 'json',
        value: JSON.stringify({reviewText: 'review'})
      }
    ]
  };

  const metafieldGraphql = await shopify.graphql(mutation, variables);

  return metafieldGraphql;
}
