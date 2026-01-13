import {onRequest} from 'firebase-functions/v2/https';
import apiHandler from './handlers/api';
import apiSaHandler from './handlers/apiSa';
import authHandler from './handlers/auth';
import authSaHandler from './handlers/authSa';
import embedAppHandler from './handlers/embed';
import clientApiHandler from './handlers/clientApi';
import {onMessagePublished} from 'firebase-functions/pubsub';
import {subcribeCreateMetafieldProduct} from './handlers/pubsub/subcribeCreateMetafieldProduct';
import {onDocumentCreated, onDocumentUpdated} from 'firebase-functions/firestore';
import {handleReviewCreated} from './handlers/events/handleReviewCreated';
import {handleReviewUpdated} from './handlers/events/handleReviewUpdated';

export const embedApp = onRequest(
  {memory: '256MiB', region: ['us-central1', 'us-east1', 'europe-west2', 'asia-northeast1']},
  embedAppHandler.callback()
);

export const api = onRequest(apiHandler.callback());
export const apiSa = onRequest(apiSaHandler.callback());

export const auth = onRequest(authHandler.callback());
export const authSa = onRequest(authSaHandler.callback());

export const clientApi = onRequest(clientApiHandler.callback());

export const onCreateMetafieldProduct = onMessagePublished(
  'create-metafield-product',
  subcribeCreateMetafieldProduct
);

export const onReviewCreated = onDocumentCreated('reviews/{reviewId}', handleReviewCreated);

export const onReviewUpdated = onDocumentUpdated('reviews/{reviewId}', handleReviewUpdated);
