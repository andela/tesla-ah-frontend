import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { OptInOptOutApp, mapDispatchToProps, mapStateToProps } from '../../src/components/pages/OptInOptOutApp';

const mockStore = configureMockStore([thunk]);
const props = {
  checked: false,
  onOptOutApp: jest.fn(),
  onOptInApp: jest.fn(),
  onOptedInApp: jest.fn(),
};
const props1 = {
  checked: true,
  onOptOutApp: jest.fn(),
  onOptInApp: jest.fn(),
  onOptedInApp: jest.fn(),
};
describe('render the opt in and opt out in app component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      optInOptOutApp: {
        checked: false,
        onOptOutApp: jest.fn(),
        onOptInApp: jest.fn(),
        onOptedInApp: jest.fn(),
      },
    });
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onOptInApp();
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onOptOutApp();
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onOptedInApp();
  });
  it('should map state to props', () => {
    const wrapper = mount(<OptInOptOutApp store={store} {...props} />);
    expect(wrapper.state('checked')).toEqual((wrapper.props().checked));
    mapStateToProps({ optInOptOutApp: { checked: false } });
    expect(mapStateToProps).toBe(mapStateToProps);
  });
});
describe('Simulate form submission', () => {
  let instance;
  beforeAll(() => {
    const wrapper = mount(<OptInOptOutApp {...props} />);
    instance = wrapper.instance();
    wrapper.simulate('click');
  });
  it('Should make a request to the server', () => {
    const wrapper = mount(<OptInOptOutApp {...props} />);
    instance.forceUpdate();
    wrapper.update();
    instance.handleChange(props.checked);
  });
  it('Should make a request to the server', () => {
    const wrapper = mount(<OptInOptOutApp {...props1} />);
    instance.forceUpdate();
    wrapper.update();
    instance.handleChange(props1.checked);
  });
});
