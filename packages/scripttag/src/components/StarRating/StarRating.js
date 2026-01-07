import React from 'preact/compat';
import './StarRating.scss';
import PropTypes from 'prop-types';
import StarIcon from '../../snippets/StarIcon';
import ExpandIcon from '../../snippets/ExpandIcon';
import {formatDateRaw} from '../../helpers/formatDate';

const STAR_KEY_MAP = {
  5: 'five_star',
  4: 'four_star',
  3: 'three_star',
  2: 'two_star',
  1: 'one_star'
};

const initials = customer =>
  customer
    .split(' ')
    .map(name => name[0])
    .join('');

const StarRating = ({reviewSumary, reviews}) => {
  const totalPublished = Object.values(reviewSumary).reduce(
    (sum, starObj) => sum + (starObj.published ?? 0),
    0
  );

  const totalScore = [1, 2, 3, 4, 5].reduce((sum, star) => {
    const key = STAR_KEY_MAP[star];
    return sum + star * (reviewSumary[key]?.published ?? 0);
  }, 0);

  const averageRating = totalPublished ? (totalScore / totalPublished).toFixed(1) : 0;

  return (
    <div className="Avada-PR__Wrapper">
      <div className={'Avada-PR__Block'}>
        <div className="Avada-PR__Rating">
          <div className="Avada-PR__Average">
            <h1>{averageRating}</h1>
            <div className="Avada-PR__Star-Outer">
              <div
                className="Avada-PR__Star-Inner"
                style={{width: `${(averageRating / 5).toFixed(2) * 100}%`}}
              ></div>
            </div>
            <p>
              {totalPublished} {totalPublished === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          <div className="Avada-PR__Progress">
            {[5, 4, 3, 2, 1].map(star => {
              const key = STAR_KEY_MAP[star];

              const value = reviewSumary[key]?.published ?? 0;

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
                  <input type="radio" name="rate" id={`rate-${star}`} value={star} />
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
              <textarea
                id={'Avada-PR__Form-TextArea'}
                cols={30}
                placeholder={'Đánh giá sản phẩm...'}
              ></textarea>

              <div className="Avada-PR__Form-Error"></div>
            </div>
            <div className="Avada-PR__Form--Button">
              <button id={'Avada-PR__Form-Submit'} type={'submit'}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={'Avada-PR__Review'}>
        <div className={'Avada-PR__Review-Filter'}>
          <div className="Avada-PR__Select">
            <div className="Avada-PR__Input">
              <div className="Avada-PR__Value">Recent</div>
              <div className="Avada-PR__Expand">
                <ExpandIcon />
              </div>
            </div>
          </div>

          <div className="Avada-PR__Select">
            <div className="Avada-PR__Input">
              <div className="Avada-PR__Value">10</div>
              <div className="Avada-PR__Expand">
                <ExpandIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="Avada-PR__Review-List">
          {reviews &&
            reviews.map(review => (
              <div className="Avada-PR__Review-Item" key={review.id}>
                <div className="Avada-PR__Review-Header">
                  <div className="Avada-PR__Avatar">
                    {initials(`${review.firstName} ${review.lastName}`)}
                  </div>
                  <div className="Avada-PR__Customer">{`${review.firstName} ${review.lastName}`}</div>
                </div>
                <div className="Avada-PR__Review-Detail">
                  <div className="Avada-PR__Review-Rating">
                    {[...Array(review.rate)].map((_, i) => (
                      <span key={`filled-${i}`} style={{color: '#2980b9'}}>
                        &#9733;
                      </span>
                    ))}

                    {[...Array(5 - review.rate)].map((_, i) => (
                      <span key={`empty-${i}`} style={{color: '#ededed'}}>
                        &#9733;
                      </span>
                    ))}
                  </div>

                  <div className="Avada-PR__Review-Date">{formatDateRaw(review.createdAt)}</div>
                </div>
                <div
                  className="Avada-PR__Review-Content"
                  style={{
                    WebkitLineClamp: 3
                  }}
                >
                  {review.content}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default StarRating;

StarRating.propTypes = {
  reviewSumary: PropTypes.object,
  reviews: PropTypes.array
};
