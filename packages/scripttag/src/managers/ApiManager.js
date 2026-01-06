import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  createReview = async data => {
    return this.createReviewApi(data);
  };

  createReviewApi = async data => {
    const shopDomain = window.Shopify.shop;
    const review = await makeRequest('http://127.0.0.1:5000/clientApi/reviews', 'POST', data, {
      headers: {
        'X-Shop-Domain': shopDomain
      },
      contentType: 'application/json;charset=UTF-8'
    });

    return review;
  };
}
