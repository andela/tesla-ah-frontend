/* eslint-disable no-undef */
import checkValidity from '../../src/utils/checkValidity';

it('should be true if no rules are set', () => {
  expect(checkValidity('')).toBe(true);
});

it('should be false for required', () => {
  expect(checkValidity(' ', { required: true }).isValid).toBe(false);
});

it('should be false for wrong minLength', () => {
  expect(checkValidity('', { required: true, minLength: 3 }).isValid).toBe(
    false,
  );
  expect(checkValidity('', { required: true, minLength: 3 }).errorMessage).toBe(
    'should have a minimum length of 3',
  );
});

it('should be true for right minLength', () => {
  expect(checkValidity('333', { required: true, minLength: 3 }).isValid).toBe(
    true,
  );
});

it('should be false for wrong maxLength', () => {
  expect(checkValidity('dddd', { required: true, maxLength: 3 }).isValid).toBe(
    false,
  );
  expect(
    checkValidity('dddd', { required: true, maxLength: 3 }).errorMessage,
  ).toBe('should have a maximum length of 3');
});

it('should be true for right maxLength', () => {
  expect(checkValidity('333', { required: true, maxLength: 3 }).isValid).toBe(
    true,
  );
});

it('should be false with errorMessage for wrong email', () => {
  expect(
    checkValidity('dfdf@dfkd', { required: true, isEmail: true }).isValid,
  ).toBe(false);
  expect(
    checkValidity('dfdf@dfkd', { required: true, isEmail: true }).errorMessage,
  ).toBe('is not valid');
});

it('should be true with errorMessage for right email', () => {
  expect(
    checkValidity('test@email.com', { required: true, isEmail: true }).isValid,
  ).toBe(true);
});

it('should be false with errorMessage with wrong numeric type', () => {
  expect(
    checkValidity('dss', { required: true, isNumeric: true }).isValid,
  ).toBe(false);
  expect(
    checkValidity('dss', { required: true, isNumeric: true }).errorMessage,
  ).toBe('is not a number');
});

it('should be true with right numeric type', () => {
  expect(checkValidity(8, { required: true, isNumeric: true }).isValid).toBe(
    true,
  );
});
