import {render} from 'preact';
import React from 'preact/compat';
import StarRating from '../components/StarRating/StarRating';

export default class ReviewSummaryManager {
  constructor() {
    this.reviewSummary = {};
  }

  initialize(reviewSummary) {
    this.reviewSummary = reviewSummary;

    console.log(this.reviewSummary);

    this.display();

    this.activeForm();
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
        document.querySelector('.Avada-PR__Form').classList.add('--active');
      });
    });
  }
}
