import React from 'react';
import Product from '../client/components/product';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe('<Product>', () => {
  let item;
  let wrapper;
  beforeEach(() => {
    item = {
      id: 93,
      name: 'TCL-M',
      category: 'TV',
      image:'https://goo.gl/images/oj4pSr',
      overallReview: 3,
      reviewNumber: 184,
      price: '$627.00',
      isPrime: true,
      hasReview: false,
    };
  });
  it('should always render a box', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a div that contains everything', () => {
    wrapper = shallow(<Product item={item} />);
    const divs = wrapper.find('div');
    console.log(divs);
    const divBox = divs.first();
    expect(divBox.children()).toEqual(wrapper.children());
  });
  it('should render product name, review number, price', () => {
    wrapper = shallow(<Product item={item} />);
    expect(wrapper.find('.name').text()).toMatchSnapshot();
    expect(wrapper.find('.reviewNumber').text()).toMatchSnapshot();
    expect(wrapper.find('.price').text()).toMatchSnapshot();
  });
  it('should show rating base on the overallReview number', () => {
    wrapper = shallow(<Product item={item} />);
    expect(wrapper.find('.overallReview').hasClass('three')).toBe(true);
  });
  it('should show image', () => {
    wrapper = shallow(<Product item={item} />);
    expect(wrapper.find('img').src).toBe(item.image_url);
  });
  it('should show Prime image if isPrime is true', () => {
    wrapper = shallow(<Product item={item} />);
    expect(wrapper.find('.isPrime').length).toEqual(1);
    expect(wrapper.find('.noPrime').length).toEqual(0);
  });
  describe('when isPrime is false', () => {
    beforeEach(() => {
      item.isPrime = false;
    });
    it('should not show Prime image', () => {
      wrapper = shallow(<Product item={item} />);
      expect(wrapper.find('.isPrime').length).toEqual(0);
      expect(wrapper.find('.noPrime').length).toEqual(1);
    });
  });
  describe('Product name is too longer', () => {
    beforeEach(() => {
      item.name = 'Mpow Flame Bluetooth Headphones Waterproof IPX7, Wireless Earbuds Sport, Richer Bass HiFi Stereo In-Ear Earphones w/ Mic, Case, 7-9 Hrs Playback Noise Cancelling Headsets (Comfy & Fast Pairing)'
    });
    it("should slice the name and add '...' to the end of the name", () => {
      wrapper = shallow(<Product item={item} />);
      setTimeout(() => {
        expect(wrapper.find('.name').text()).toEqual(item.name.slice(0, 80).concat('...'));
      }, 1000);
    });
  });
});

