/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from 'react';
import Rater from 'react-rating';
import ProgressBar from '../widgets/ProgressBar';

const theme = {
  color: '#ffd700',
  border: '1px solid #fff',
  fontSize: '10px',
};
const ArticleRatingOverall = ({ rating, onPercentageHandle }) => {
  if (rating.Ratings === undefined) {
    return null;
  }
  const overallStats = Object.values(rating.Ratings.percentage);
  return (
    <div>
      <div
        className="card p-2 mt-1"
        style={{
          width: '20rem', zIndex: '500', position: 'absolute',
        }}
      >
        <div className="row">
          <div className="col-lg-6">
            <Rater
              initialRating={
              rating.Ratings !== undefined ? rating.Ratings.report.Average : 0
          }
              style={theme}
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x"
              readonly
            />
          </div>
          <div className="col-lg-6">
            {rating.Ratings !== undefined ? rating.Ratings.report.Average : 0}
            {' '}
            out of 5 stars
          </div>
        </div>
        {
          overallStats !== undefined && overallStats.map((rate, index) => (
            <div className="row" key={index}>
              <div className="col-lg-3">
                {index + 1}
                {' '}
                {' '}
                Star
              </div>
              <div className="col-lg-6 pt-1">{rate !== undefined ? rate ? (<ProgressBar onPercentageHandle={onPercentageHandle(rate)} />) : null : <ProgressBar onPercentageHandle={0} />}</div>
              <div className="col-lg-3">{rate !== undefined ? rate : '0 %'}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ArticleRatingOverall;
