import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { OptInOptOutEmail, mapDispatchToProps, mapStateToProps } from '../../src/components/pages/OptInOptOutEmail';

const mockStore = configureMockStore([thunk]);
const props = {
  checked: false,
  onOptOutEmail: jest.fn(),
  onOptInEmail: jest.fn(),
  onOptedInEmail: jest.fn(),
};
const props1 = {
  checked: true,
  onOptOutEmail: jest.fn(),
  onOptInEmail: jest.fn(),
  onOptedInEmail: jest.fn(),
};
describe('render the opt in and opt out email component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      optInOptOutEmail: {
        checked: false,
        onOptOutEmail: jest.fn(),
        onOptInEmail: jest.fn(),
        onOptedInEmail: jest.fn(),
      },
    });
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onOptInEmail();
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onOptOutEmail();
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onOptedInEmail();
  });
  it('should map state to props', () => {
    const wrapper = mount(<OptInOptOutEmail store={store} {...props} />);
    expect(wrapper.state('checked')).toEqual((wrapper.props().checked));
    mapStateToProps({ optInOptOutEmail: { checked: false } });
    expect(mapStateToProps).toBe(mapStateToProps);
  });
});
describe('Simulate form submission', () => {
  let instance;
  beforeAll(() => {
    const wrapper = mount(<OptInOptOutEmail {...props} />);
    instance = wrapper.instance();
    wrapper.simulate('click');
  });
  it('Should make a request to the server', () => {
    const wrapper = mount(<OptInOptOutEmail {...props} />);
    instance.forceUpdate();
    wrapper.update();
    instance.handleChange(props.checked);
  });
  it('Should make a request to the server', () => {
    const wrapper = mount(<OptInOptOutEmail {...props1} />);
    instance.forceUpdate();
    wrapper.update();
    instance.handleChange(props1.checked);
  });
});
