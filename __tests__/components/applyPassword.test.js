import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApplyPasswordFormRedux, { ApplyPasswordForm, mapDispatchToProps } from '../../src/components/pages/ApplyPasswordForm';

const mockStore = configureMockStore([thunk]);
const props = {
  message: '',
  status: '',
  ui: { loading: false },
  onApplyPassword: jest.fn(),
  match: { params: { token: 'token' } },
};
describe('render apply password form component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      applyPassword: {
        message: '',
        status: '',
        ui: { loading: false },
        onApplyPassword: jest.fn(),
      },
    });
  });
  it('should render the apply password form', async () => {
    const wrapper = shallow(<ApplyPasswordFormRedux store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should not have input component at success', async () => {
    const props1 = { ...props, status: 201, match: { params: { token: 'token' } } };
    const wrapper = shallow(<ApplyPasswordForm store={store} {...props1} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Input').length).toBe(0);
  });
  it('should return an error when the two password are not the same', async () => {
    const wrapper = mount(<ApplyPasswordForm store={store} {...props} />);
    const newpassword = wrapper.find('input[name="newpassword"]');
    newpassword.simulate('change', {
      target: { name: 'newpassword', value: 'Test11123!' },
    });
    expect(wrapper.state('newpassword')).toEqual('Test11123!');
    const confirmPassword = wrapper.find('input[name="confirmPassword"]');
    confirmPassword.simulate('change', {
      target: { name: 'confirmPassword', value: 'Tes' },
    });
    expect(wrapper.state('confirmPassword')).toEqual('Tes');
    wrapper.find('form')
      .simulate('submit');
    expect(wrapper.state('passwordError')).toEqual('Password and Confirm Password should match!');
  });
  it('should return no error if the two passwords match', async () => {
    const wrapper = mount(<ApplyPasswordForm store={store} {...props} />);
    const newpassword = wrapper.find('input[name="newpassword"]');
    newpassword.simulate('change', {
      target: { name: 'newpassword', value: 'Test11123!' },
    });
    expect(wrapper.state('newpassword')).toEqual('Test11123!');
    const confirmPassword = wrapper.find('input[name="confirmPassword"]');
    confirmPassword.simulate('change', {
      target: { name: 'confirmPassword', value: 'Test11123!' },
    });
    expect(wrapper.state('confirmPassword')).toEqual('Test11123!');
    wrapper.find('form').simulate('submit');
    expect(wrapper.state('passwordError')).toEqual('');
  });
  it('should throw an error if the password is not in the right format', async () => {
    const wrapper = mount(<ApplyPasswordForm store={store} {...props} />);
    wrapper
      .find('input[name="newpassword"]')
      .simulate('change', { target: { name: 'newpassword', value: 'HelloHel' } });
    expect(wrapper.state('errorMessage')).toEqual('Password is required and must be at least 8 letters containing'
      + ' at least a number a Lowercase letter and an Uppercase letter');
  });
  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onApplyPassword();
  });
});
