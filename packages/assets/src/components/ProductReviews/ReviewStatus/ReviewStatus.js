import React from 'react';
import {Button, Popover, ActionList, Badge} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

export default function ReviewStatus({status, onUpdateStatus}) {
  const [active, setActive] = useState(false);
  const badgeMap = {
    published: <Badge tone="success">Published</Badge>,
    unpublished: <Badge tone="enabled">Unpublished</Badge>
  };

  const toggleActive = useCallback(() => setActive(active => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure variant="plain">
      {badgeMap[status]}
    </Button>
  );

  return (
    <div onClick={e => e.stopPropagation()}>
      <Popover active={active} activator={activator} onClose={toggleActive}>
        <ActionList
          items={[
            {
              content: 'Publish',
              active: status === 'published',
              disabled: status === 'published',
              onAction: () => {
                onUpdateStatus?.('published');
                toggleActive();
              }
            },
            {
              content: 'Unpublish',
              active: status === 'unpublished',
              disabled: status === 'unpublished',
              onAction: () => {
                onUpdateStatus?.('unpublished');
                toggleActive();
              }
            }
          ]}
        />
      </Popover>
    </div>
  );
}

ReviewStatus.propTypes = {
  status: PropTypes.string,
  onUpdateStatus: PropTypes.func
};
