import {render} from 'preact';
import React from 'preact/compat';
import StarRating from '../components/StarRating/StarRating';
import ReviewedPanel from '../components/ReviewedPanel';

export default class ReviewSummaryManager {
  constructor() {
    this.reviewSummary = {};
    this.formValue = {};
    this.apiManager = null;
    this.product = {};
    this.customer = {};
    this.reviews = [];
    this.rating = 0;
    this.ratingCount = 0;
  }

  initialize(product, customer, reviewSummary, reviews, rating, ratingCount, apiManager) {
    this.reviewSummary = reviewSummary;
    this.apiManager = apiManager;
    this.product = product;
    this.customer = customer;
    this.reviews = reviews;
    this.rating = rating;
    this.ratingCount = ratingCount;

    console.log(this.rating);
    console.log(this.ratingCount);

    this.display();

    this.activeForm();

    this.submitForm();
  }

  display() {
    const container = document.querySelector('#Avada-PR-Summary');

    if (!container) return;

    render(
      <StarRating
        reviewSumary={this.reviewSummary}
        reviews={this.reviews}
        rating={this.rating}
        ratingCount={this.ratingCount}
        customer={this.customer}
      />,
      container
    );
  }

  activeForm() {
    document.querySelectorAll('input[name="rate"]').forEach(input => {
      input.addEventListener('change', e => {
        console.log(e.target.value);
        this.setFormValue({
          rate: Number(e.target.value)
        });
        document.querySelector('.Avada-PR__Form').classList.add('--active');
      });
    });

    const textarea = document.querySelector('#Avada-PR__Form-TextArea');
    if (!textarea) return;

    textarea.addEventListener('input', e => {
      this.setFormValue({
        content: e.target.value
      });

      if (e.target.value.trim()) {
        this.clearError();
      }
    });
  }

  async submitForm() {
    const button = document.querySelector('#Avada-PR__Form-Submit');

    button.addEventListener('click', async () => {
      button.disabled = true;
      button.classList.add('-disable');
      button.textContent = 'Đang gửi...';
      const {id} = this.product;
      const {rate, content} = this.formValue;
      const {firstName, lastName, email} = this.customer;

      if (!content) {
        this.showError('Nội dung không được để trống');
        return;
      }

      const payload = {
        rate: rate,
        content: content,
        firstName,
        lastName,
        email,
        productId: id
      };

      await this.apiManager.createReview(payload);

      const actionEl = document.querySelector('.Avada-PR__Action');

      actionEl.innerHTML = '';
      render(<ReviewedPanel />, actionEl);
    });
  }

  setFormValue(value) {
    this.formValue = {
      ...this.formValue,
      ...value
    };
  }

  clearError() {
    const errorEl = document.querySelector('.Avada-PR__Form-Error');

    if (!errorEl) return;

    errorEl.textContent = '';
    errorEl.classList.remove('--show');
  }

  showError(message) {
    const errorEl = document.querySelector('.Avada-PR__Form-Error');
    console.log(errorEl);

    if (!errorEl) return;

    errorEl.textContent = message;
    errorEl.classList.add('--show');
  }
}
