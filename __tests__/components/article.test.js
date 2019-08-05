/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { articles } from '../mockData';
import Article from '../../src/components/common/Article';

const renderArticleForm = (args) => {
  const defaultProps = {
    coverImage: '',
    title: '',
    description: '',
    lastUpdated: '',
    readTime: '',
    likes: '',
    dislikes: '',
    slug: '',
  };
  const props = { ...defaultProps, ...args };

  return shallow(<Article {...props} />);
};

it('renders article component', () => {
  const {
    gallery,
    title,
    description,
    updatedAt,
    readtime,
    slug,
  } = articles[0];
  const wrapper = renderArticleForm({
    coverImage: gallery[0],
    title,
    description,
    lastUpdated: new Date(updatedAt).toDateString(),
    readTime: readtime,
    likes: 10,
    dislikes: 5,
    slug,
  });

  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.article-card').length).toBe(1);
  expect(wrapper.find('img').length).toBe(1);
  expect(wrapper.find('.article-title').length).toBe(1);
  expect(wrapper.find('.article-description').length).toBe(1);
  expect(wrapper.find('.article-actions').length).toBe(1);
  expect(wrapper.find('span').length).toBe(4);
});

it('renders article component without image', () => {
  const {
    title,
    description,
    updatedAt,
    readtime,
    slug,
  } = articles[0];

  const wrapper = renderArticleForm({
    coverImage: null,
    title,
    description,
    lastUpdated: new Date(updatedAt).toDateString(),
    readTime: readtime,
    likes: 10,
    dislikes: 5,
    slug,
  });

  expect(wrapper.find('img').length).toBe(0);
});
