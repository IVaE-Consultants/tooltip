"use strict";
/**
 * @author yiminghe@gmail.com
 */
var React = require('react');
var rcUtil = require('rc-util');
var createChainedFunction = rcUtil.createChainedFunction;
var domAlign = require('dom-align');
var Popup = require('./Popup');

class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    var state = {
      visible: !!props.defaultVisible
    };
    if ('visible' in props) {
      state.visible = !!props.visible;
    }
    this.state = state;
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      if(nextProps.visible) {
          this.getTipContainer();
      }
      this.setState({
        visible: !!nextProps.visible
      });
    }
  }

  componentWillUnmount() {
    if(this.tipContainer) {
        React.unmountComponentAtNode(this.tipContainer);
        document.body.removeChild(this.tipContainer);
    }
  }

  getTipContainer() {
    if (!this.tipContainer) {
      this.tipContainer = document.createElement('div');
      document.body.appendChild(this.tipContainer);
    }
    return this.tipContainer;
  }

  renderToolTip(callback) {
    React.render(
        this.getPopupElement(),
        this.getTipContainer(),
        function () {
            callback(this);
        });
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
      if (!this.popupRendered) {
          return;
      }
      var state = this.state;
      this.renderToolTip((tooltip)=> {
          if (state.visible) {
              var rootNode = React.findDOMNode(this);
              var tipNode = tooltip.getRootNode();
              var placement = this.props.placement;
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

  getPopupElement() {
    if (!this.popupRendered) {
      return null;
    }
    const props = this.props;
    const state = this.state;
    return (<Popup prefixCls={props.prefixCls}
        visible={state.visible}
        placement={props.placement}
        animation={props.animation}
        wrap={this}
        style={props.overlayStyle}
        transitionName={props.transitionName}>
      {props.overlay}
    </Popup>);
  }

  render() {
    if(this.state.visible) {
      this.popupRendered = true;
    }
    var props = this.props;
    var children = props.children;
    var child = React.Children.only(children);
    var childProps = child.props || {};
    var newChildProps = {};
    return React.cloneElement(child, newChildProps);
  }
}

Tooltip.propTypes = {
  placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  overlay: React.PropTypes.node.isRequired
};

Tooltip.defaultProps = {
  prefixCls: 'rc-tooltip',
  onVisibleChange: function () {
  },
  placement: 'right'
};

module.exports = Tooltip;
