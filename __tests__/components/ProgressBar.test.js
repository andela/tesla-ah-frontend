import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '../../src/components/widgets/ProgressBar';

describe('ProgressBar Tests', () => {
  it('should render the ProgressBar component', () => {
    const props = {
      onPercentageHandle: jest.fn(),
    };
    const wrapper = shallow(<ProgressBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
