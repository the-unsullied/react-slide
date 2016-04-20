'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
Component that acts as a button with spinner
@class Fancy Button Component
@param {Number} closeSlide when incremented will close the slide
@param {String} handleClose callback after animation of slide closing has stopped
*/
exports.default = _react2.default.createClass({
  getDefaultProps: function getDefaultProps() {
    return {
      closeSlide: 0,
      handleClose: function handleClose() {}
    };
  },

  propTypes: {
    closeSlide: _react2.default.PropTypes.number,
    handleClose: _react2.default.PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      isShowing: false,
      closeSlide: 0
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    document.querySelector('html').style.overflow = 'hidden';
    //20ms delay fix issue with browser and css animation
    setTimeout(function () {
      _this.setState({ isShowing: true });
    }, 20);
  },
  componentWillUnmount: function componentWillUnmount() {
    document.querySelector('html').style.overflow = 'auto';
  },
  componentWillUpdate: function componentWillUpdate(nextProps) {
    if (nextProps.closeSlide === this.props.closeSlide + 1) {
      this.performClose();
    }
  },
  close: function close(e) {
    e.stopPropagation();
    var classList = e.target.classList;

    var shouldClose = classList.contains('slide__close');
    if (shouldClose) {
      this.performClose();
    }
  },
  performClose: function performClose() {
    var _this2 = this;

    this.setState({ isShowing: false });
    setTimeout(function () {
      if (typeof _this2.props.handleClose === 'function') {
        _this2.props.handleClose();
      }
    }, 500);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('slide', { 'slide--showing': this.state.isShowing }) },
      _react2.default.createElement(
        'div',
        { className: 'section' },
        _react2.default.createElement('i', { className: 'slide__close icon-close', onClick: this.close }),
        this.props.children
      )
    );
  }
});
module.exports = exports['default'];
