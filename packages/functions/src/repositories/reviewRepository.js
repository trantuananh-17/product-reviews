import {presentDataAndFormatDate} from '@avada/firestore-utils';
import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const reviewRef = firestore.collection('reviews');

export async function findAll(shopId, softBy, limit, page, after, before) {
  if (!after && !before) {
    const snap = await reviewRef
      .where('shopId', '==', shopId)
      .orderBy('createdAt', 'desc')
      .orderBy('__name__')
      .limit(limit + 1)
      .get();

    const docs = snap.docs;
    const hasNext = docs.length > limit;

    if (hasNext) docs.pop();

    return {
      data: docs.map(doc => presentDataAndFormatDate(doc)),
      pageInfo: {
        previousCursor: false,
        nextCursor: hasNext ? docs.at(-1)?.id : false,
        hasNext,
        hasPrev: false
      }
    };
  }

  if (!after) {
  }

  if (!before) {
  }
}

export async function getCountTotalDocs(shopId) {
  const snap = await reviewRef
    .where('shopId', '==', shopId)
    .count()
    .get();
  return snap.data().count;
}

export async function save(data, shopId, shopDomain) {
  const docRef = reviewRef.doc();
  const createdAt = new Date();

  const payload = {
    id: docRef.id,
    ...data,
    shopId,
    shopDomain,
    ignoreContentValidation: false,
    notificationSource: 'email',
    status: 'disapproved',
    createdAt
  };

  const review = {
    id: docRef.id,
    ...data,
    shopDomain,
    ignoreContentValidation: false,
    notificationSource: 'email',
    status: 'disapproved',
    createdAt
  };

  await docRef.set(payload);

  return review;
}

export async function getOne() {}
