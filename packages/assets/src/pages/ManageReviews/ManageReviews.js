import IndexFilterPR from '@assets/components/ProductReviews/IndexFilterPR';
import {Layout, Page} from '@shopify/polaris';
import React from 'react';
import './ProductReviews.scss';

export default function ManageReview() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="fullWidth">
          <IndexFilterPR />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
