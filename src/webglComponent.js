import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WebGLComponent extends Component {
  componentDidMount() {
    const gl = this.canvas.getContext('webgl');
    this.props.initialize(gl);
    this.startRendering();
  }

  startRendering() {
    const gl = this.canvas.getContext('webgl');
    this.shouldStop = false;

    const renderLoop = () => {
      this.props.render(gl);
      window.requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }

  stopRendering() {
    this.shouldStop = true;
  }

  componentWillUnmount() {
    this.stopRendering();
  }

  render() {
    return <canvas
      className={this.props.className}
      ref={c => {this.canvas = c}}
      width={this.props.size[0]}
      height={this.props.size[1]} />
  }
}


WebGLComponent.propTypes = {
  size: PropTypes.array,
  render: PropTypes.func,
  initialize: PropTypes.func
}


export default WebGLComponent;