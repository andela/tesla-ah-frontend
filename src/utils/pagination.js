import Pages from 'lodash';

const pagination = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return Pages(items).slice(startIndex).take(pageSize).value();
};

export default pagination;
