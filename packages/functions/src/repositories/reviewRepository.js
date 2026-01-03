import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const reviewRef = firestore.collection('reviews');

export async function findAll(shopId, softBy, filter) {}

export async function save(data, shopId, shopDomain) {
  const docRef = reviewRef.doc();
  const payload = {
    id: docRef.id,
    ...data,
    shopId,
    shopDomain,
    ignoreContentValidation: false,
    notificationSource: 'email',
    status: 'disapproved',
    createdAt: new Date()
  };

  await docRef.set(payload);

  return payload;
}

export async function getOne() {}
