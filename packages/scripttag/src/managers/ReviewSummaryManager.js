import {render} from 'preact';
import React from 'preact/compat';
import StarRating from '../components/StarRating/StarRating';

export default class ReviewSummaryManager {
  constructor() {
    this.reviewSummary = {};
    this.formValue = {};
    this.apiManager = null;
    this.product = {};
    this.customer = {};
    this.reviews = [];
  }

  initialize(product, customer, reviewSummary, reviews, apiManager) {
    this.reviewSummary = reviewSummary;
    this.apiManager = apiManager;
    this.product = product;
    this.customer = customer;
    this.reviews = reviews;

    this.display();

    this.activeForm();

    this.submitForm();
  }

  display() {
    const container = document.querySelector('#Avada-PR-Summary');

    if (!container) return;

    render(<StarRating data={this.reviewSummary} />, container);
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
      const {id, handle, featured_image, title} = this.product;
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
        productTitle: title,
        productId: id,
        productImage: featured_image,
        productHandle: handle
      };

      const review = await this.apiManager.createReview(payload);

      console.log(review);
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
