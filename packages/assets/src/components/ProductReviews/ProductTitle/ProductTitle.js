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
import React from 'react';

export default function ProductTitle() {
  return (
    <Box padding={'300'}>
      <InlineStack gap={500} wrap={false}>
        <Box>
          <Thumbnail
            source={
              'https://cdn.shopify.com/s/files/1/0965/4901/1736/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1767171974&width=160'
            }
          />
        </Box>

        <BlockStack inlineAlign="start" gap={100}>
          <Button
            onClick={e => e.stopPropagation()}
            variant="plain"
            url="https://avada-second-chance.myshopify.com/products/the-complete-snowboard"
            target="_blank"
          >
            <Text as="span" fontWeight="semibold" variant="headingMd">
              Product
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
            <Tooltip content="anhht@avadagroup.com">
              <Text as="span" tone="magic-subdued">
                Anh Anh
              </Text>
            </Tooltip>
          </InlineStack>
        </BlockStack>
      </InlineStack>
    </Box>
  );
}
