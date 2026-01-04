import ReviewSummaryManager from './managers/ReviewSummaryManager';

console.log('This is the script tag');
console.log(Avada_Reviews);

(async () => {
  const reviewSummaryManager = new ReviewSummaryManager();

  reviewSummaryManager.initialize(Avada_Reviews);
})();
