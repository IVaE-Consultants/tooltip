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
    var _this = this;

    _classCallCheck(this, Tooltip);

    _get(Object.getPrototypeOf(Tooltip.prototype), 'constructor', this).call(this, props);
    this.state = {
      visible: !!props.defaultVisible
    };
    if ('visible' in props) {
      this.state.visible = !!props.visible;
    }
    ['toggle', 'show', 'hide'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _inherits(Tooltip, _React$Component);

  _createClass(Tooltip, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ('visible' in nextProps) {
        this.setState({
          visible: !!nextProps.visible
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.tipContainer) {
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
      var props = this.props;
      var state = this.state;
      React.render(React.createElement(
        Popup,
        { prefixCls: props.prefixCls,
          visible: state.visible,
          placement: props.placement,
          transitionName: props.transitionName },
        props.overlay
      ), this.getTipContainer(), function () {
        callback(this);
      });
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.state.visible) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: 'setVisible',
    value: function setVisible(visible) {
      var _this2 = this;

      this.setState({
        visible: visible
      }, function () {
        _this2.props.onVisibleChange(_this2.state.visible);
      });
    }
  }, {
    key: 'show',
    value: function show() {
      this.setVisible(true);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setVisible(false);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this3 = this;

      var state = this.state;
      this.renderToolTip(function (tooltip) {
        if (state.visible) {
          var rootNode = React.findDOMNode(_this3);
          var tipNode = tooltip.getRootNode();
          var placement = _this3.props.placement;
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
    key: 'render',
    value: function render() {
      var props = this.props;
      var children = props.children;
      var child = React.Children.only(children);
      var childProps = child.props || {};
      var newChildProps = {};
      var trigger = props.trigger;
      if (trigger.indexOf('click') !== -1) {
        newChildProps.onClick = createChainedFunction(this.toggle, childProps.onClick);
      }
      if (trigger.indexOf('hover') !== -1) {
        newChildProps.onMouseEnter = createChainedFunction(this.show, childProps.onMouseEnter);
        newChildProps.onMouseLeave = createChainedFunction(this.hide, childProps.onMouseLeave);
      }
      if (trigger.indexOf('focus') !== -1) {
        newChildProps.onFocus = createChainedFunction(this.show, childProps.onFocus);
        newChildProps.onBlur = createChainedFunction(this.hide, childProps.onBlur);
      }
      return React.cloneElement(child, newChildProps);
    }
  }]);

  return Tooltip;
})(React.Component);

Tooltip.propTypes = {
  trigger: React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus'])),
  placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  onVisibleChange: React.PropTypes.func,
  overlay: React.PropTypes.node.isRequired
};

Tooltip.defaultProps = {
  prefixCls: 'rc-tooltip',
  onVisibleChange: function onVisibleChange() {},
  placement: 'right',
  trigger: ['hover']
};

module.exports = Tooltip;

