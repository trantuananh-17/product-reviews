import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';

export async function getByIds(shopData, ids) {
  const shopify = initShopify(shopData);

  const query = loadGraphQL('/queries/productsByids.graphql');

  const variables = {
    ids
  };

  const productsByIdsGraphql = await shopify.graphql(query, variables);

  return productsByIdsGraphql.nodes;
}
