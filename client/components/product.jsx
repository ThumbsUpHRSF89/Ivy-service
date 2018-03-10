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
      if(window.innerWidth <=1422) {
        if (nameHeight >= 30) {
          this.setState({ productName: this.state.productName.slice(0, 50).concat('...') });
        }
      } else if (window.innerWidth <=1500) {
        if (nameHeight >= 67) {
          this.setState({ productName: this.state.productName.slice(0, 84).concat('...') });
        }
      } else {
        if (nameHeight >= 30) {
          this.setState({ productName: this.state.productName.slice(0, 80).concat('...') });
        }
      }
    }
  }
  render() {
    let rev;
    const review = this.props.item.overallReview;
    switch (review) {
      case 5:
        rev = 'five';
        break;
      case 4.5:
        rev = 'fourHalf';
        break;
      case 4:
        rev = 'four';
        break;
      case 3.5:
        rev = 'threeHalf';
        break;
      case 3:
        rev = 'three';
        break;
      case 2.5:
        rev = 'twoHalf';
        break;
      case 2:
        rev = 'two';
        break;
      case 1.5:
        rev = 'oneHalf';
        break;
      case 1:
        rev = 'one';
        break;
      default:
        rev = 'five';
    }
    const ele = <div className={rev+' overallReview'} />;
    
    const ele2 = this.props.item.isPrime ? <span className="isPrime"> {this.props.item.isPrime} </span> : <span className="noPrime"> {this.props.item.isPrime} </span>;
  
    return (
      <div className="box-wrap">
        <div className="box">
          <div className="image"><a href={'http://127.0.0.1:8000/product/' + this.props.item.id}><img src={this.props.item.image} alt="productImage" /></a></div>
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
      </div>
    );
  }
}
