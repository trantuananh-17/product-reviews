import IndexFilterPR from '@assets/components/ProductReviews/IndexFilterPR';
import {Layout, Page} from '@shopify/polaris';
import React from 'react';
import './ProductReviews.scss';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import useEditApi from '@assets/hooks/api/useEditApi';

export default function ManageReview() {
  const {loading, data: reviews, setData: setInput, fetched} = useFetchApi({
    url: '/reviews',
    defaultData: null
  });

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="fullWidth">
          {reviews && <IndexFilterPR reviews={reviews.data} />}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
