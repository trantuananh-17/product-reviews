import {Timestamp} from '@google-cloud/firestore/build/src';

declare interface IUserContext {
  shop: Shop;
  shopID: string;
  type: 'shopify';
}

declare interface Shop {
  id: string;
  accessToken: string;
  appStatus: boolean;
  domain: string;
  email: string;
  installedAt: Date | Timestamp | string;
  isInstalled: boolean;
  isOnTrial: boolean;
  name: string;
  plan: string;
  shopifyDomain: string;
  uid: string;
  vendor: string;
}

declare interface ShopInfo {
  [key: string]: any;
}

declare interface Subscription {
  shop: Shop;
  getting: boolean;
  subscribing: boolean;
}

declare interface IStoreReducer {
  state: IStoreState;
  dispatch: Function;
}

declare interface IStoreState {
  loading: boolean;
  user: any;
  shop: Shop;
  subscription: Subscription;
  toast?: {content: string; error: boolean};
}

declare interface IReview {
  id: string;
  lastName: string;
  content: string;
  shopId: string;
  productId: number;
  firstName: string;
  notificationSource: string;
  productImage: string;
  shopDomain: string;
  rate: number;
  email: string;
  ignoreContentValidation: boolean;
  productTitle: string;
  productHandle: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date;
}

declare interface IPageInfo {
  previousCursor: boolean;
  nextCursor: boolean;
  hasNext: string | null;
  hasPrev: string | null;
}

declare interface ICreateAndUpdateReview {
  productId: number;
  rate: number;
}

declare interface IMetafieldProduct {
  reviews: IReview[] | [];
  reviewSummay: {
    five_star: {
      published: number;
      unpublished: number;
    };
    four_star: {
      published: number;
      unpublished: number;
    };
    three_star: {
      published: number;
      unpublished: number;
    };
    two_star: {
      published: number;
      unpublished: number;
    };
    one_star: {
      published: number;
      unpublished: number;
    };
  };
}
