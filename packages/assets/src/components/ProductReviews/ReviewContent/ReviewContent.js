import {Button} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

export default function ReviewContent({content}) {
  const [expanded, setExpanded] = useState(false);
  const count = content.length;

  return (
    <div className="Reviews-ReviewList__Content">
      <span>
        <span
          style={{
            WebkitLineClamp: expanded ? 'unset' : 2
          }}
        >
          {content}
        </span>

        {count >= 145 ? (
          <Button
            variant="plain"
            onClick={e => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? 'See less' : 'See more'}
          </Button>
        ) : (
          ''
        )}
      </span>
    </div>
  );
}

ReviewContent.propTypes = {
  content: PropTypes.string
};
