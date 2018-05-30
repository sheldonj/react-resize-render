import { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

export default class RenderResize extends Component {
  static debounceInterval = 10;
  static listeners = [];
  static deboundedResize = null;
  static applyResize = function applyResize() {
    const dimensions = { width: window.innerWidth, height: window.innerHeight };
    RenderResize.listeners.forEach(listener => listener(dimensions));
  };
  static addResizeListener = function addResizeListener(cb) {
    RenderResize.listeners.push(cb);
    if (!RenderResize.deboundedResize) {
      RenderResize.deboundedResize = debounce(RenderResize.applyResize, RenderResize.debouncInterval);
      window.addEventListener('resize', RenderResize.deboundedResize, false);
    }
  };
  static removeResizeListener = function removeEventListener(cb) {
    const idx = RenderResize.listeners.indexOf(cb);
    RenderResize.listeners.splice(idx, 1);
    if (!RenderResize.listeners.length) {
      window.removeEventListener('resize', RenderResize.deboundedResize, false);
      RenderResize.deboundedResize = null;
    }
  };
  static propTypes = {
    render: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    RenderResize.addResizeListener(this.handleResize);
    this.setDimensions(window.innerWidth, window.innerHeight);
  }
  componentWillUnmount() {
    RenderResize.removeResizeListener(this.handleResize);
  }
  setDimensions(width, height) {
    this.setState({ width, height });
  }
  handleResize(dimensions) {
    const { width, height } = dimensions;
    this.setDimensions(width, height);
  }
  render() {
    return this.props.render(this.state);
  }
}
