import ApiManager from './managers/ApiManager';
import ReviewSummaryManager from './managers/ReviewSummaryManager';

console.log('This is the script tag');
console.log(Avada_Reviews);

(async () => {
  const reviewSummaryManager = new ReviewSummaryManager();
  const apiManager = new ApiManager();

  const reviewSummary = Avada_Reviews.productReview.reviewSummary;
  const reviews = Avada_Reviews.productReview.reviews;
  const product = Avada_Reviews.product;
  const customer = Avada_Reviews.customer;
  const rating = Avada_Reviews.rating;
  const ratingCount = Avada_Reviews.ratingCount;

  console.log('reviewSummary', reviewSummary);
  console.log('reviews', reviews);
  console.log('product', reviewSummary);
  console.log('customer', customer);
  console.log('rating', rating);
  console.log('ratingCount', ratingCount);
  reviewSummaryManager.initialize(
    product,
    customer,
    reviewSummary,
    reviews,
    Number(rating),
    Number(ratingCount),
    apiManager
  );
})();
