import IndexFilterPR from '@assets/components/ProductReviews/IndexFilterPR';
import {Layout, Page} from '@shopify/polaris';
import React from 'react';
import './ProductReviews.scss';
import useFetchApi from '@assets/hooks/api/useFetchApi';

export default function ManageReview() {
  const {loading, data: input, setData: setInput, fetched} = useFetchApi({
    url: '/reviews',
    defaultData: null
  });

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
