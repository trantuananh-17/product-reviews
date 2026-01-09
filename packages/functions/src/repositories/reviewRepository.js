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
        hasPrev: null
      }
    };
  }

  if (!after) {
  }

  if (!before) {
  }
}

export async function findOne(id) {
  const doc = await reviewRef.doc(id).get();

  return presentDataAndFormatDate(doc);
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
    status: 'unpublished',
    createdAt
  };

  const review = {
    id: docRef.id,
    ...data,
    shopDomain,
    ignoreContentValidation: false,
    notificationSource: 'email',
    status: 'unpublished',
    createdAt
  };

  await docRef.set(payload);

  return review;
}

export async function updateOne(id, data) {
  await reviewRef.doc(id).update({
    ...data,
    updatedAt: new Date()
  });
}

export async function getOne() {}
