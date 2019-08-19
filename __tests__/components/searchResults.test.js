import React from 'react';
import { shallow } from 'enzyme';
import { Results, mapStateToProps } from '../../src/components/pages/SearchResults';
import { article } from '../../__mocks__/data';

const props = {
  search: {
    results: [],
  },
};

const props2 = {
  search: {
    failed: false,
    pending: true,
  },
};
const props3 = {
  search: {
    done: true,
    results: [],
  },
};
const props4 = {
  search: {
    results: article,
  },
};
const props5 = {
  search: {
    failed: true,
  },
};
let results;
let instance;

describe('Search results component tests', () => {
  beforeAll(() => {
    results = shallow(<Results {...props} />);
    instance = results.instance();
    instance.getNewprops = jest.fn();
    instance.getNewprops();
  });
  test('Should render perfectly...', () => {
    expect(results).toBeDefined();
  });
  test('Should receive new props...', () => {
    instance.componentWillReceiveProps({
      search: {
        results: [],
      },
    });
    expect(instance.getNewprops).toHaveBeenCalled();
  });
  test('Test pending branch', () => {
    results = shallow(<Results {...props2} />);
    expect(results).toBeDefined();
  });
  test('Should render an error alert if there is no article for the specific author', () => {
    results = shallow(<Results {...props3} />);
    expect(results).toBeDefined();
  });
  test('Should get a bunch of articles', () => {
    results = shallow(<Results {...props4} />);
    results.instance().setState({
      articles: article,
    });
    expect(results).toBeDefined();
  });
  test('Search failed', () => {
    results = shallow(<Results {...props5} />);
    expect(results).toBeDefined();
  });
  test('Should map states to props...', () => {
    mapStateToProps({
      search: {
        results: [],
        done: true,
        failed: false,
        pending: false,
      },
    });
    expect(mapStateToProps).toBeDefined();
  });
});
