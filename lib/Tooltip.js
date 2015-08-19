'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * @author yiminghe@gmail.com
 */
var React = require('react');
var rcUtil = require('rc-util');
var createChainedFunction = rcUtil.createChainedFunction;
var domAlign = require('dom-align');
var Popup = require('./Popup');

var Tooltip = (function (_React$Component) {
  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    _get(Object.getPrototypeOf(Tooltip.prototype), 'constructor', this).call(this, props);
    var state = {
      visible: !!props.defaultVisible
    };
    if ('visible' in props) {
      state.visible = !!props.visible;
    }
    this.state = state;
  }

  _inherits(Tooltip, _React$Component);

  _createClass(Tooltip, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('visible' in nextProps) {
        if (nextProps.visible) {
          this.getTipContainer();
        }
        this.setState({
          visible: !!nextProps.visible
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.tipContainer) {
        React.unmountComponentAtNode(this.tipContainer);
        document.body.removeChild(this.tipContainer);
      }
    }
  }, {
    key: 'getTipContainer',
    value: function getTipContainer() {
      if (!this.tipContainer) {
        this.tipContainer = document.createElement('div');
        document.body.appendChild(this.tipContainer);
      }
      return this.tipContainer;
    }
  }, {
    key: 'renderToolTip',
    value: function renderToolTip(callback) {
      React.render(this.getPopupElement(), this.getTipContainer(), function () {
        callback(this);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this = this;

      if (!this.popupRendered) {
        return;
      }
      var state = this.state;
      this.renderToolTip(function (tooltip) {
        if (state.visible) {
          var rootNode = React.findDOMNode(_this);
          var tipNode = tooltip.getRootNode();
          var placement = _this.props.placement;
          if (placement && placement.points) {
            domAlign(tipNode, rootNode, placement);
          } else {
            var points = ['cr', 'cl'];
            if (placement === 'right') {
              points = ['cl', 'cr'];
            } else if (placement === 'top') {
              points = ['bc', 'tc'];
            } else if (placement === 'bottom') {
              points = ['tc', 'bc'];
            }
            domAlign(tipNode, rootNode, {
              points: points
            });
          }
        }
      });
    }
  }, {
    key: 'getPopupElement',
    value: function getPopupElement() {
      if (!this.popupRendered) {
        return null;
      }
      var props = this.props;
      var state = this.state;
      return React.createElement(
        Popup,
        { prefixCls: props.prefixCls,
          visible: state.visible,
          placement: props.placement,
          animation: props.animation,
          wrap: this,
          style: props.overlayStyle,
          transitionName: props.transitionName },
        props.overlay
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.visible) {
        this.popupRendered = true;
      }
      var props = this.props;
      var children = props.children;
      var child = React.Children.only(children);
      var childProps = child.props || {};
      var newChildProps = {};
      return React.cloneElement(child, newChildProps);
    }
  }]);

  return Tooltip;
})(React.Component);

Tooltip.propTypes = {
  placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  overlay: React.PropTypes.node.isRequired
};

Tooltip.defaultProps = {
  prefixCls: 'rc-tooltip',
  onVisibleChange: function onVisibleChange() {},
  placement: 'right'
};

module.exports = Tooltip;

