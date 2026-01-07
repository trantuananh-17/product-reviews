import React from 'react';
import './ReviewedPanel.scss';
import Success from '../../snippets/Success';

const ReviewedPanel = () => {
  return (
    <div className="Avada-RP">
      <div className="Avada-RP__Icon">
        <Success />
      </div>
      <p className="Avada-RP__Titlte">Cảm ơn bạn đã đánh giá!</p>
    </div>
  );
};

export default ReviewedPanel;
