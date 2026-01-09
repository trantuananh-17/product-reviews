import {
  BlockStack,
  Box,
  Button,
  Icon,
  InlineStack,
  Text,
  Thumbnail,
  Tooltip
} from '@shopify/polaris';
import {PersonIcon} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import React from 'react';

export default function ProductTitle({productImage, productTitle, lastName, firstName, email}) {
  return (
    <Box padding={'300'}>
      <InlineStack gap={500} wrap={false}>
        <Box>
          <Thumbnail source={productImage} />
        </Box>

        <BlockStack inlineAlign="start" gap={100}>
          <Button
            onClick={e => e.stopPropagation()}
            variant="plain"
            url="https://avada-second-chance.myshopify.com/products/the-complete-snowboard"
            target="_blank"
          >
            <Text as="span" fontWeight="semibold" variant="headingMd">
              {productTitle}
            </Text>
          </Button>

          <InlineStack gap="100" align="center" wrap={false} blockAlign="center">
            <Icon source={PersonIcon} />
            <Text as="span">By Customer</Text>
            <div
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'black',
                margin: '3px 0px 0px 2px'
              }}
            ></div>
            <Tooltip content={email}>
              <Text as="span" tone="magic-subdued">
                {lastName} {firstName}
              </Text>
            </Tooltip>
          </InlineStack>
        </BlockStack>
      </InlineStack>
    </Box>
  );
}

ProductTitle.propTypes = {
  productImage: PropTypes.string,
  productTitle: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  email: PropTypes.string
};
