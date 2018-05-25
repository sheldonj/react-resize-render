import { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class RenderResize extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  /** START STATIC METHODS FOR OPTIMIZING RESIZE HANDLERS */
  static debounceInterval = 10;
  static listeners = [];
  static handleResize = function handleResize() {
    const dimensions = { width: window.innerWidth, height: window.innerHeight };
    RenderResize.listeners.forEach(listener => listener(dimensions));
  };
  static deboundedResize = null;
  static addResizeListener = function addResizeListener(cb) {
    RenderResize.listeners.push(cb);
    if (!RenderResize.deboundedResize) {
      RenderResize.deboundedResize = debounce(RenderResize.handleResize, RenderResize.debouncInterval);
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
  /** END STATIC METHODS FOR OPTIMIZING RESIZE HANDLERS */
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    RenderResize.addResizeListener(this.handleResize);
    // eslint-disable-next-line
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillUnmount() {
    RenderResize.removeResizeListener(this.handleResize);
  }
  handleResize(dimensions) {
    this.setState(dimensions);
  }
  render() {
    return this.props.render(this.state);
  }
}

export default RenderResize;
