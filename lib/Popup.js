'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * @author yiminghe@gmail.com
 */

var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Popup = (function (_React$Component) {
  function Popup() {
    _classCallCheck(this, Popup);

    _get(Object.getPrototypeOf(Popup.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(Popup, _React$Component);

  _createClass(Popup, [{
    key: 'getPlacementCss',
    value: function getPlacementCss() {
      var props = this.props;
      var prefixCls = props.prefixCls;
      var placement = props.placement;
      return prefixCls + '-placement-' + placement;
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
      var className = props.prefixCls + ' ' + this.getPlacementCss();
      if (props.className) {
        className += ' ' + props.className;
      }
      var arrowClassName = props.prefixCls + '-arrow';
      var innerClassname = props.prefixCls + '-inner';
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
          { transitionAppear: true, transitionName: props.transitionName },
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

