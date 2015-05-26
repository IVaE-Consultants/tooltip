'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * @author yiminghe@gmail.com
 */

var React = require('react');
var CSSTransitionGroup = require('rc-css-transition-group');

var Popup = (function (_React$Component) {
  function Popup() {
    _classCallCheck(this, Popup);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Popup, _React$Component);

  _createClass(Popup, [{
    key: 'getPlacementCss',
    value: function getPlacementCss() {
      var props = this.props;
      var prefixCls = props.prefixCls;
      var placement = props.placement;
      return '' + prefixCls + '-placement-' + placement;
    }
  }, {
    key: 'getRootNode',
    value: function getRootNode() {
      return React.findDOMNode(this.refs.popup);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var className = '' + props.prefixCls + ' ' + this.getPlacementCss();
      if (props.className) {
        className += ' ' + props.className;
      }
      var arrowClassName = '' + props.prefixCls + '-arrow';
      var innerClassname = '' + props.prefixCls + '-inner';
      var content = props.visible ? [React.createElement(
        'div',
        { className: className,
          key: 'popup',
          ref: 'popup',
          style: this.style },
        React.createElement('div', { className: arrowClassName }),
        React.createElement(
          'div',
          { className: innerClassname },
          props.children
        )
      )] : [];
      if (props.transitionName) {
        return React.createElement(
          CSSTransitionGroup,
          { transitionName: props.transitionName },
          content
        );
      } else {
        return content[0] || null;
      }
    }
  }]);

  return Popup;
})(React.Component);

module.exports = Popup;