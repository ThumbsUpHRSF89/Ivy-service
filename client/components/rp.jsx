import React from 'react';
import $ from 'jquery';
import Product from './product';


export default class RelatedProduct extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this);
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this);
    this.handleStartOverButton = this.handleStartOverButton.bind(this);
    this.state = {
      currentData: [],
      data: [],
      count: 1,
      pageNum: 1,
      pages: 0,
    };
  }
  
  componentDidMount() {
    this.getData(4); // if want to test on local server 8001 change "this.props.id" to a number 
  }

  getData(id) {
    $.get(`http://127.0.0.1:8001/product/${id}`).done((body) => {
      console.log('data from database', body);
      this.setState({ data: body });
      let totalPage = Math.ceil(body.length / 11);
      const cd = body.slice(0, 11);
      this.setState({
        currentData: cd,
        pages: totalPage,
      });
    }).fail((err) => {
      if (err) {
        console.log('can not get data from database');
      }
    });
  }

  handleLeftButtonClick() {
    const pageTotalNum = Math.ceil(this.state.data.length / 11);
    if (this.state.pageNum === pageTotalNum) {
      return;
    }
    const start = this.state.count * 11;
    const end = (this.state.count + 1) * 11;
    const cd = this.state.data.slice(start, end);
    this.setState({
      currentData: cd,
      count: this.state.count + 1,
      pageNum: this.state.pageNum + 1,
    });
  }
  handleRightButtonClick() {
    if (this.state.pageNum === 1) {
      return;
    }
    const start = (this.state.count - 2) * 11;
    const end = (this.state.count - 1) * 11;
    const cd = this.state.data.slice(start, end);
    this.setState({
      currentData: cd,
      count: this.state.count - 1,
      pageNum: this.state.pageNum - 1,
    });
  }
  handleStartOverButton() {
    this.setState({
      currentData: this.state.data.slice(0, 11),
      count: 1,
      pageNum: 1,
    });
  }
  render() {
    const arr = [];
    this.state.currentData.forEach((n) => {
      arr.push(<Product item={n} key={n.id} />);
    });
    let button;
    if (this.state.pageNum !== 1) {
      button = <div className="startOver" onClick={this.handleStartOverButton}>Start over</div>;
    } 
    return (
      <div>
        <div className="pageBox">
          {button}
          <div className="pageNum">Page {this.state.pageNum} of {this.state.pages}</div>
        </div>
        <div className="outterBox">
          <div className="leftButton"><button onClick={this.handleRightButtonClick} /></div>
          <div className="placeholder">{arr}</div>
          <div className="rightButton"><button onClick={this.handleLeftButtonClick} /></div>
        </div>
      </div>
    );
  }
}

