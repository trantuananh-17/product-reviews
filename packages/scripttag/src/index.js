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

  console.log('reviews', reviews);
  console.log('product', product);
  console.log('customer', customer);

  reviewSummaryManager.initialize(product, customer, reviewSummary, reviews, apiManager);
})();
