import {
  ChoiceList,
  IndexFilters,
  IndexTable,
  LegacyCard,
  RangeSlider,
  TextField,
  useIndexResourceState,
  useSetIndexFiltersMode,
  EmptyState
} from '@shopify/polaris';
import React, {useCallback, useState} from 'react';
import ProductTitle from '../ProductTitle/ProductTitle';
import StarRating from '../StarRating';
import ReviewContent from '../ReviewContent/ReviewContent';
import {formatDateOnly} from '@assets/helpers/utils/formatFullTime';
import ReviewStatus from '../ReviewStatus';
import useEditApi from '@assets/hooks/api/useEditApi';
import useFetchApi from '@assets/hooks/api/useFetchApi';

export default function IndexFilterPR() {
  const {loading: fetchLoading, data: reviews, fetched, fetchApi} = useFetchApi({
    url: '/reviews',
    defaultData: null
  });

  const itemStrings = ['All', 'Published', 'Unpublished'];

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0
  }));
  const [selected, setSelected] = useState(0);
  const [editLoading, setEditLoading] = useState(false);

  const sortOptions = [
    {label: 'Date', value: 'date asc', directionLabel: 'Ascending'},
    {label: 'Date', value: 'date desc', directionLabel: 'Descending'},
    {label: 'Rating', value: 'rate asc', directionLabel: 'Lowest first'},
    {label: 'Rating', value: 'rate desc', directionLabel: 'Highest first'},
    {label: 'Review with media', value: 'media asc', directionLabel: 'Oldest first'},
    {label: 'Review with media', value: 'media desc', directionLabel: 'Newest first'}
  ];
  const [sortSelected, setSortSelected] = useState(['date desc']);
  const {mode, setMode} = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const [accountStatus, setAccountStatus] = useState(undefined);
  const [moneySpent, setMoneySpent] = useState(undefined);
  const [taggedWith, setTaggedWith] = useState('');
  const [queryValue, setQueryValue] = useState('');

  const handleAccountStatusChange = useCallback(value => setAccountStatus(value), []);
  const handleMoneySpentChange = useCallback(value => setMoneySpent(value), []);
  const handleTaggedWithChange = useCallback(value => setTaggedWith(value), []);
  const handleFiltersQueryChange = useCallback(value => setQueryValue(value), []);
  const handleAccountStatusRemove = useCallback(() => setAccountStatus(undefined), []);
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(undefined), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove
  ]);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            {label: 'Enabled', value: 'enabled'},
            {label: 'Not invited', value: 'not invited'},
            {label: 'Invited', value: 'invited'},
            {label: 'Declined', value: 'declined'}
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      )
    }
  ];

  const appliedFilters = [];
  if (accountStatus && !isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove
    });
  }
  if (moneySpent) {
    const key = 'moneySpent';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove
    });
  }

  const resourceName = {
    singular: 'review',
    plural: 'reviews'
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(
    reviews
  );

  const {handleEdit} = useEditApi({
    url: '/reviews'
  });

  const onUpdateStatus = async (id, status) => {
    setEditLoading(true);

    try {
      await handleEdit({id, status});
    } catch (error) {
      console.log(error);
    } finally {
      setEditLoading(false);
    }
    fetchApi();
  };

  const rowMarkup =
    reviews &&
    reviews.data.map(
      (
        {id, product, firstName, lastName, rate, email, productId, content, createdAt, status},
        index
      ) => (
        <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
          <IndexTable.Cell flush={true}>
            <ProductTitle />
          </IndexTable.Cell>
          <IndexTable.Cell>
            <StarRating rate={rate} />
          </IndexTable.Cell>

          <IndexTable.Cell>
            <ReviewContent content={content} />
          </IndexTable.Cell>

          <IndexTable.Cell>{formatDateOnly(createdAt)}</IndexTable.Cell>
          <IndexTable.Cell>
            <ReviewStatus status={status} onUpdateStatus={status => onUpdateStatus(id, status)} />
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    );

  const bulkActions = [
    {
      content: 'Publish',
      onAction: () => {
        console.log('Publish:', selectedResources);
      }
    },
    {
      content: 'Unpublish',
      onAction: () => {
        console.log('Unpublish:', selectedResources);
      }
    },
    {
      content: 'Delete selected reviews',
      destructive: true,
      onAction: () => {
        console.log('Delete:', selectedResources);
      }
    }
  ];

  const emptyStateMarkup = (
    <EmptyState
      heading="No reviews found"
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    >
      <p>Try changing the filters or search term.</p>
    </EmptyState>
  );

  return (
    <LegacyCard>
      <IndexFilters
        loading={editLoading || fetchLoading}
        disabled={editLoading || fetchLoading}
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => setQueryValue('')}
        onSort={setSortSelected}
        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false
        }}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
      />
      <IndexTable
        loading={!fetched}
        resourceName={resourceName}
        itemCount={reviews && reviews.data.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        emptyState={emptyStateMarkup}
        headings={[
          {title: 'Product'},
          {title: 'Rating'},
          {title: 'Content'},
          {title: 'Created'},
          {title: 'Status'}
        ]}
        promotedBulkActions={bulkActions}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return value.map(val => `Customer ${val}`).join(', ');
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}

IndexFilterPR.propTypes = {};
