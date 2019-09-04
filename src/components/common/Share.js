import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FRONTEND_URL, API_URL } from '../../utils/constants';

const Share = (props) => {
  const { article } = props;

  const [facebookCount, setFbCount] = useState(0);
  const [twitterCount, setTwtCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);

  const getFbCount = () => {
    axios.get(`${API_URL}/articles/${article.slug}/shares/facebook`)
      .then((response) => {
        setFbCount(response.data.data.shares);
      });
  };
  const getTwtCount = () => {
    axios.get(`${API_URL}/articles/${article.slug}/shares/twitter`)
      .then((response) => {
        setTwtCount(response.data.data.shares);
      });
  };
  const getEmailCount = () => {
    axios.get(`${API_URL}/articles/${article.slug}/shares/email`)
      .then((response) => {
        setEmailCount(response.data.data.shares);
      });
  };

  useEffect(() => {
    getFbCount();
    getTwtCount();
    getEmailCount();
  });

  const shareSocial = (provider) => {
    switch (provider) {
      case 'facebook':
        // eslint-disable-next-line no-undef
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.shares',
          action_properties: JSON.stringify({
            object: {
              'og:url': `${FRONTEND_URL}/articles/${article.slug}`,
              'og:title': article.title,
              'og:description': article.description,
              'og:site_name': 'Authors Haven by #TeamTesla',
            },
          }),
        });
        axios.get(`${API_URL}/articles/${article.slug}/share/facebook`)
          .then(() => {
            getFbCount();
          });
        break;
      case 'twitter':
        axios.get(`${API_URL}/articles/${article.slug}/share/twitter`)
          .then(() => {
            getTwtCount();
          });
        break;
      case 'email':
        axios.get(`${API_URL}/articles/${article.slug}/share/email`)
          .then(() => {
            getEmailCount();
          });
        break;
      default:
    }
  };

  if (article) {
    const tweet = `"${article.title}" - by ${article.author.username} @ ${FRONTEND_URL}/articles/${article.slug}`;
    return (
      <React.Fragment>
        <div className="share-count">
          <button
            className="floating-buttons mt-3 facebook"
            type="button"
            onClick={() => shareSocial('facebook')}
          >
            <i className="fab fa-facebook-f" />
          </button>
          <span className="badge badge-secondary count">{facebookCount}</span>
        </div>
        <div className="share-count">
          <button
            type="button"
            className="floating-buttons mt-3 twitter"
          >
            <a
              href={`https://twitter.com/intent/tweet?text=${tweet}&hashtags=TeamTesla`}
              onClick={() => shareSocial('twitter')}
            >
              <i className="fab fa-twitter" />
            </a>
          </button>
          <span className="badge badge-secondary count">{twitterCount}</span>
        </div>
        <div className="share-count">
          <button
            type="button"
            className="floating-buttons mt-3 email"
          >
            <a
              href={`mailto:?subject=Checkout this article on Authors Haven&body=${article.description} - ${article.author.username} @ ${FRONTEND_URL}/articles/${article.slug}`}
              onClick={() => shareSocial('email')}
            >
              <i className="fas fa-envelope-open" />
            </a>
          </button>
          <span className="badge badge-secondary count">{emailCount}</span>
        </div>
      </React.Fragment>
    );
  }
  return null;
};

export default Share;
