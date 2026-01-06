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

const customer = 'Tuấn Anh';

const initials = customer
  .split(' ')
  .map(name => name[0])
  .join('');

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
          <div className="Avada-PR__Review-Item">
            <div className="Avada-PR__Review-Header">
              <div className="Avada-PR__Avatar">{initials}</div>
              <div className="Avada-PR__Customer">{customer}</div>
            </div>
            <div className="Avada-PR__Review-Detail">
              <div className="Avada-PR__Review-Rating">
                {[...Array(2)].map((_, i) => (
                  <span key={`filled-${i}`} style={{color: '#2980b9'}}>
                    &#9733;
                  </span>
                ))}

                {[...Array(3)].map((_, i) => (
                  <span key={`empty-${i}`} style={{color: '#ededed'}}>
                    &#9733;
                  </span>
                ))}
              </div>

              <div className="Avada-PR__Review-Date">
                {formatDateRaw('2026-01-03T12:38:55.771Z')}
              </div>
            </div>
            <div
              className="Avada-PR__Review-Content"
              style={{
                WebkitLineClamp: 3
              }}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum architecto sit
              adipisci unde nulla nesciunt, vero totam maiores tempore impedit neque est, quod enim
              vel, dolorum fugit! Ab, voluptatem laborum. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Illo excepturi tempora consectetur dolore laboriosam iste alias
              sapiente modi inventore tempore, ipsa incidunt! Inventore odio suscipit porro ipsam
              possimus quisquam ratione. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Placeat atque aliquid sapiente magnam veritatis? Earum error quisquam, dolorum
              assumenda totam culpa vel nesciunt provident esse voluptates, minus maiores
              distinctio. Voluptatem.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StarRating;

StarRating.propTypes = {
  data: PropTypes.object
};
