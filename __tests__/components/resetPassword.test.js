import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ResetPasswordEmailRedux, {
  ResetPasswordEmail,
  mapDispatchToProps,
} from '../../src/components/pages/ResetPasswordEmail';

const mockStore = configureMockStore([thunk]);
const props = {
  message: '',
  status: '',
  ui: { loading: false },
  onResetRequest: jest.fn(),
};
describe('render request reset password form component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      resetPassword: {
        message: '',
        status: '',
        ui: { loading: false },
        onResetRequest: jest.fn(),
      },
    });
  });
  it('should render request reset password component', async () => {
    const wrapper = shallow(<ResetPasswordEmailRedux store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should not have input component after success', async () => {
    const props1 = { ...props, status: 201 };
    const wrapper = shallow(<ResetPasswordEmail store={store} {...props1} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Input').length).toBe(0);
  });
  it('should throw an error if the email is not in the right format', async () => {
    const wrapper = mount(<ResetPasswordEmail store={store} {...props} />);
    wrapper
      .find('input[name="email"]')
      .simulate('change', {
        target: { name: 'email', value: 'nim@y.c' },
      });
    expect(wrapper.state('errorMessage')).toEqual('Email is required and should look like this : example@email.com!');
  });
  it('should change the email value in the state', () => {
    const wrapper = mount(<ResetPasswordEmail {...props} />);
    const email = wrapper.find('input[name="email"]');
    email.simulate('change', {
      target: { name: 'email', value: 'example@email.com' },
    });
    expect(wrapper.state('email')).toEqual('example@email.com');
    expect(wrapper.state('errorMessage')).toEqual('');
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onResetRequest();
  });
});
describe('Simulate form submission', () => {
  let instance;
  beforeAll(() => {
    const wrapper = mount(<ResetPasswordEmail {...props} />);
    instance = wrapper.instance();
    wrapper.simulate('click');
  });
  it('Should make a request to the server', () => {
    const wrapper = mount(<ResetPasswordEmail {...props} />);
    instance.forceUpdate();
    wrapper.update();
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleSubmit(event);
  });
});
