const generateShopifyGid = (entityType, value) => {
  return `gid://shopify/${entityType}/${value}`;
};

export const generateShopifyProductGid = value => {
  return generateShopifyGid('Product', value);
};
