import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import RelatedProduct from '../client/components/rp';

Enzyme.configure({ adapter: new Adapter() });
let wrapper;
beforeEach(() => {
  wrapper = shallow(<RelatedProduct />)
  wrapper.setState({
    currentData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    pageNum: 1,
  });
});

describe('<RelatedProduct>', () => {
  describe('rendering', () => {
    it('should be a stateful class component', () => {
      expect(React.Component.isPrototypeOf(RelatedProduct)).toBe.true;
    });
    it('calls componentDidMount', () => {
      sinon.spy(RelatedProduct.prototype, 'componentDidMount');
      wrapper = shallow(<RelatedProduct />);
      expect(RelatedProduct.prototype.componentDidMount.calledOnce).toEqual(true);
    });
    it('should render a div that contains everything', () => {
      const divs = wrapper.find('div');
      const divBox = divs.first();
      expect(divBox.children()).toEqual(wrapper.children());
    });
    it('should render <Product> components', () => {
      expect(wrapper.find('Product')).toHaveLength(11);
    });
    it('should render buttons', () => {
      expect(wrapper.find('.leftButton')).toHaveLength(1);
      expect(wrapper.find('.rightButton')).toHaveLength(1);
    });
    it('should not exist when page number is  1', () => {
      expect(wrapper.find('.startOver').length).toEqual(0);
    });
    describe('start over button', () => {
      beforeEach(() => {
        wrapper.setState({
          pageNum: 2,
        });
      });
      it('should exist when page number is more than 1', () => {
        expect(wrapper.find('.startOver').length).toEqual(1);
      });
    });
  });
});

describe('snapshots', () => {
  it('should show new data when click on right button ', () => {
    wrapper.find('.rightButton button').simulate('click');
    expect(wrapper).toMatchSnapshot();
    wrapper.find('.leftButton button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
