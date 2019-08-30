/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../src/components/pages/Home';
import ArticleItem from '../../src/components/items/Articleitem';
import ImageItem from '../../src/components/items/Imageitem';
import SliderItem from '../../src/components/items/Slideritem';
import Slider from '../../src/components/layouts/Slider';
import Maincontent from '../../src/components/layouts/Maincontent';
import { getItemDataFromDatabase } from '../../src/utils/getArticleItemData';
import { article } from '../../__mocks__/data';
import Preloader from '../../src/components/widgets/Preloader';

let home;
describe('Home Components tests...', () => {
  const props = {
    article: {
      articles: article,
    },
    getArticles: jest.fn(),
    location: { search: 'path' },
  };
  beforeAll(() => {
    home = shallow(<Home {...props} />);
  });

  it('Should render Home component', () => {
    home
      .instance()
      .componentWillReceiveProps({
        article: { articles: article },
        auth: { verified: true },
      });
    home.instance().changeCurrentPage(1);
    expect(home).toMatchSnapshot();
  });
  it('Should find one Slider', () => {
    const slider = home.find('Slider');
    expect(typeof slider.length).toBe('number');
  });
});
describe('Item Component tests ...', () => {
  const props1 = {
    article: getItemDataFromDatabase(article[0]),
  };
  const props2 = {
    article: getItemDataFromDatabase(article[1]),
  };
  let item1;
  let item2;
  beforeAll(() => {
    item1 = shallow(<ArticleItem {...props1} />);
    item2 = shallow(<ArticleItem {...props2} />);
  });
  it('Should render Articleitem component', () => {
    expect(item1).toMatchSnapshot();
    expect(item2).toMatchSnapshot();
  });
});
describe('Sliderite component test', () => {
  const props1 = {
    article: getItemDataFromDatabase(article[0]),
  };
  const props2 = {
    article: undefined,
  };

  let slideritem1;
  let slideritem2;
  beforeAll(() => {
    slideritem1 = shallow(<SliderItem {...props1} />);
    slideritem2 = shallow(<SliderItem {...props2} />);
  });
  it('Should render Slider item component', () => {
    expect(slideritem1).toMatchSnapshot();
    expect(slideritem2).toMatchSnapshot();
  });
});
describe('Imageitem component test', () => {
  const props1 = {
    image:
      'https://res.cloudinary.com/tesla-ah-media/image/upload/v1565521197/aohpzzejvcxwol3rpjma.jpg',
  };
  const props2 = {
    image: null,
  };
  let image1;
  let image2;
  beforeAll(() => {
    image1 = shallow(<ImageItem {...props1} />);
    image2 = shallow(<ImageItem {...props2} />);
  });
  it('Should render Imageitem component', () => {
    expect(image1).toMatchSnapshot();
    expect(image2).toMatchSnapshot();
  });
  it('Should find one img and one div', () => {
    const image = image1.find('img');
    const div = image1.find('div');
    expect(image.length).toBe(1);
    expect(div.length).toBe(1);
  });
  it('Should find one div', () => {
    const image = image2.find('img');
    const div = image2.find('div');
    expect(image.length).toBe(0);
    expect(div.length).toBe(1);
  });
});
describe('Slider component test', () => {
  const props1 = {
    Articles: { articles: article },
  };
  const props2 = {
    Articles: {},
  };
  const props3 = {
    Articles: { articles: [article[0], article[1]] },
  };
  let slider1;
  let slider2;
  let slider3;
  beforeAll(() => {
    slider1 = shallow(<Slider {...props1} />);
    slider2 = shallow(<Slider {...props2} />);
    slider3 = shallow(<Slider {...props3} />);
  });
  it('Should render Slider component', () => {
    expect(slider1).toMatchSnapshot();
    expect(slider2).toMatchSnapshot();
    expect(slider3).toMatchSnapshot();
  });
});
describe('Maincontent component test', () => {
  const articleItems = article.map(item => (
    <ArticleItem key={item.id} article={getItemDataFromDatabase(item)} />
  ));
  const props = {
    Articles: articleItems,
  };
  let main;
  beforeAll(() => {
    main = shallow(<Maincontent {...props} />);
  });
  it('Should render Slider component', () => {
    expect(main).toMatchSnapshot();
  });
});

describe('Preloader component test', () => {
  let preloader;
  beforeAll(() => {
    preloader = shallow(<Preloader />);
  });
  it('Should render Slider component', () => {
    expect(preloader).toMatchSnapshot();
  });
});
