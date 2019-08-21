import checkUser from '../../src/utils/checkUser';

describe('CheckUser helper test', () => {
  beforeEach(() => {
    sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  });

  it('retrieves token from session storage', () => {
    expect(checkUser()).toBeDefined();
  });
});
