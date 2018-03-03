import React from 'react';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: props.item.name,
    }
  }
  
  componentDidMount() {
    const name = document.getElementById(this.props.item.id);
    if (name) {
      const nameHeight = name.clientHeight;
      if (nameHeight > 50) {
        this.setState({ productName: this.state.productName.slice(0, 80).concat('...') });
      }
    }
  }
  render() {
    let rev;
    const review = this.props.item.overallReview;

    if (review === 5) {
      rev = 'five';
    } else if (review === 4.5) {
      rev = 'fourHalf';
    } else if (review === 4) {
      rev = 'four';
    } else if (review === 3.5) {
      rev = 'threeHalf';
    } else if (review === 3) {
      rev = 'three';
    } else if (review === 2.5) {
      rev = 'twoHalf';
    } else if (review === 2) {
      rev = 'two';
    } else if (review === 1.5) {
      rev = 'oneHalf';
    } else if (review === 1) {
      rev = 'one';
    } else if (review === 0.5) {
      rev = 'half';
    } else if (review === 0) {
      rev = 'zero';
    }
    const ele = <div className={rev+' overallReview'} />;
    let ele2;
    const isPrime = this.props.item.isPrime;
    if (isPrime) {
      ele2 = <span className="isPrime"> {this.props.item.isPrime} </span>;
    } else {
      ele2 = <span className="noPrime"> {this.props.item.isPrime} </span>;
    }

    return (
      <div className="box">
        <div className="image"><a href={'http://127.0.0.1:8000/' + this.props.item.id}><img src={this.props.item.image} alt="productImage" /></a></div>
        <div className="infobox">
          <div className="name"><div className="text" id={this.props.item.id}>{this.state.productName}</div></div>
          <div className="reviewBox">
            {ele}
            <span className="reviewNumber"> {this.props.item.reviewNumber} </span>
          </div>
          <div className="pricebox">
            <span className="price"> {this.props.item.price} </span>
            {ele2}
          </div>
        </div>
      </div>
    );
  }
}
