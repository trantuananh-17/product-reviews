import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const reviewRef = firestore.collection('reviews');

export async function findAll(shopId, softBy, filter) {}

export async function save(data, shopId, shopDomain) {
  const docRef = reviewRef.doc();
  const created = new Date();
  const payload = {
    id: docRef.id,
    ...data,
    shopId,
    shopDomain,
    ignoreContentValidation: false,
    notificationSource: 'email',
    status: 'disapproved',
    created
  };

  const review = {
    id: docRef.id,
    ...data,
    shopDomain,
    ignoreContentValidation: false,
    notificationSource: 'email',
    status: 'disapproved',
    created
  };

  await docRef.set(payload);

  return review;
}

export async function getOne() {}
