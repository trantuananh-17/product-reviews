import React from 'preact/compat';
import './StarRating.scss';
import PropTypes from 'prop-types';
import StarIcon from '../../snippets/StarIcon';

const STAR_KEY_MAP = {
  5: 'five_star',
  4: 'four_star',
  3: 'three_star',
  2: 'two_star',
  1: 'one_star'
};
// const data = {
//   four_star: {
//     unpublished: 1,
//     published: 1
//   },
//   one_star: {
//     unpublished: 0,
//     published: 1
//   },
//   three_star: {
//     unpublished: 0,
//     published: 0
//   },
//   five_star: {
//     published: 0,
//     unpublished: 0
//   },
//   two_star: {
//     unpublished: 0,
//     published: 0
//   }
// };

const StarRating = ({data}) => {
  const totalPublished = Object.values(data).reduce(
    (sum, starObj) => sum + (starObj.published ?? 0),
    0
  );

  const totalScore = [1, 2, 3, 4, 5].reduce((sum, star) => {
    const key = STAR_KEY_MAP[star];
    return sum + star * (data[key]?.published ?? 0);
  }, 0);

  const averageRating = totalPublished ? (totalScore / totalPublished).toFixed(1) : 0;

  return (
    <div className="Avada-PR__Wrapper">
      <div className={'Avada-PR__Block'}>
        <div className="Avada-PR__Rating">
          <div className="Avada-PR__Average">
            <h1>{averageRating}</h1>
            <div className="Avada-PR__Star-Outer">
              <div className="Avada-PR__Star-Inner">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            </div>
            <p>
              {totalPublished} {totalPublished === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          <div className="Avada-PR__Progress">
            {[5, 4, 3, 2, 1].map(star => {
              const key = STAR_KEY_MAP[star];

              const value = data[key]?.published ?? 0;

              return (
                <div key={star} className="Avada-PR__Progress-Value">
                  <p>
                    {star} <span className="Avada-PR__Star">&#9733;</span>
                  </p>
                  <div className="Avada-PR__Progress-Bar">
                    <div
                      className="Avada-PR__Progress-Fill"
                      style={{width: `${(value / totalPublished) * 100}% `}}
                    ></div>
                  </div>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="Avada-PR__Action">
          <p>Click to review</p>
          <div className="Avada-PR__Star-List">
            {[5, 4, 3, 2, 1].map(star => {
              return (
                <>
                  <input type="radio" name="rate" id={`rate-${star}`} value={STAR_KEY_MAP[star]} />
                  <label htmlFor={`rate-${star}`}>
                    <StarIcon />
                  </label>
                </>
              );
            })}
          </div>

          <div className="Avada-PR__Form">
            <header className={'Avada-PR__Form-Header'}></header>
            <div className="Avada-PR__Form--Textarea">
              <textarea cols={30} placeholder={'Đánh giá sản phẩm...'}></textarea>
            </div>
            <div className="Avada-PR__Form--Button">
              <button type={'submit'}>Gửi</button>
            </div>
          </div>
        </div>
      </div>

      <div className={'Avada-PR__Review'}>avx</div>
    </div>
  );
};
export default StarRating;

StarRating.propTypes = {
  data: PropTypes.object
};
