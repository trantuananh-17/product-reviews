import * as reviewRepository from '@functions/repositories/reviewRepository';

export async function getReviews(shopId, softBy, filter) {}

export async function createReview(data) {
  const review = await reviewRepository.save(data);

  return review;
}
