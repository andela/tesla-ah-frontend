import React from 'react';
import { shallow } from 'enzyme';
import ChatAvatar from '../../src/components/common/ChatAvatar';

const props = {
  source: 'image.png',
  alt: 'Treize',
};

let avatar;

describe('Chat Avatar tests', () => {
  beforeAll(() => {
    avatar = shallow(<ChatAvatar {...props} />);
  });
  test('Should render', () => {
    expect(avatar).toBeDefined();
  });
});
