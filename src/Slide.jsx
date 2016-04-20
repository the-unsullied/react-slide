/**
Component that acts as a button with spinner
@class Fancy Button Component
@param {Number} closeSlide when incremented will close the slide
@param {String} handleClose callback after animation of slide closing has stopped
*/
import React from 'react';
import classnames from 'classnames';

export default React.createClass({
  getDefaultProps: function() {
    return {
      closeSlide: 0,
      handleClose: () => {}
    };
  },

  propTypes: {
    closeSlide: React.PropTypes.number,
    handleClose: React.PropTypes.func
  },

  getInitialState() {
    return {
      isShowing: false,
      closeSlide: 0
    }
  },

  componentDidMount() {
    document.querySelector('html').style.overflow = 'hidden';
    //20ms delay fix issue with browser and css animation
    setTimeout(() => {
      this.setState({isShowing: true});
    }, 20);
  },

  componentWillUnmount() {
    document.querySelector('html').style.overflow = 'auto';
  },

  componentWillUpdate(nextProps) {
    if(nextProps.closeSlide === this.props.closeSlide + 1) {
      this.performClose();
    }
  },

  close(e) {
    e.stopPropagation();
    const { classList } = e.target;
    const shouldClose = classList.contains('slide__close');
    if(shouldClose) {
      this.performClose();
    }
  },

  performClose() {
    this.setState({isShowing: false});
    setTimeout(() => {
      if(typeof this.props.handleClose === 'function') {
        this.props.handleClose();
      }
    }, 500);
  },

  render() {
    return <div className={classnames('slide', {'slide--showing': this.state.isShowing})}>
      <div className="section">
        <i className="slide__close icon-close" onClick={this.close}></i>
        {this.props.children}
      </div>
    </div>
  }
})
