import {Icon, InlineStack} from '@shopify/polaris';
import {StarFilledIcon} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import React from 'react';

export default function StarRating({rate = 4, max = 5}) {
  return (
    <InlineStack wrap={false}>
      {[...Array(rate)].map((_, i) => (
        <span key={`filled-${i}`} style={{color: 'gold'}}>
          <Icon source={StarFilledIcon} />
        </span>
      ))}

      {[...Array(max - rate)].map((_, i) => (
        <span key={`empty-${i}`} style={{color: '#ccc'}}>
          <Icon source={StarFilledIcon} />
        </span>
      ))}
    </InlineStack>
  );
}

StarRating.propTypes = {
  rate: PropTypes.number,
  max: PropTypes.number
};
