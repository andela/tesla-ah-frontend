import uniQizer from '../../src/utils/uniqueObject';

const data = [
  {
    id: 1,
    name: 'elie',
  },
  {
    id: 1,
    name: 'mugenzi',
  },
  {
    id: 3,
    name: 'esther',
  },
];

describe('Should return an array of unique data', () => {
  test('Should work', () => {
    const expectedData = [
      {
        id: 1,
        name: 'elie',
      },
      {
        id: 3,
        name: 'esther',
      },
    ];
    expect(uniQizer(data)).toEqual(expectedData);
  });
});
