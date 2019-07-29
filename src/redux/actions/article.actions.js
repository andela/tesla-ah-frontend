import { GET_ARTICLES, GET_ARTICLE } from './types/article.type';
// Dummy data which will be removed after
const articles = [
  {
    id: 1,
    slug: 'there-was-react',
    title: 'Then there was react',
    description: 'React.js levelup project',
    body: 'We are doing cool stuffs in Tesla, React project',
  },
  {
    id: 2,
    slug: 'there-was-redux',
    title: 'Then there was redux',
    description: 'Redux levelup project',
    body: 'We are doing cool stuffs in Tesla, React project',
  },
];

export const getArticles = () => (dispatch) => {
  dispatch({
    type: GET_ARTICLES,
    payload: articles,
  });
};

export const getOneArticle = () => (dispatch) => {
  dispatch({
    type: GET_ARTICLE,
    payload: articles[0],
  });
};
