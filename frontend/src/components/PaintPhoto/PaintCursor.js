import React, {Component} from 'react';


const BRUSH_WIDTH = 40;

const style = {
  position: 'fixed',
  zIndex: 9999,
  pointerEvents: 'none'
};

export default class PaintCursor extends Component {

  state = {
    x: 0,
    y: 0
  };

  componentDidMount() {
    document.body.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });
  };

  render() {
    let { x, y } = this.state;
    const radius = BRUSH_WIDTH / 2;
    x -= radius;
    y -= radius;

    return (
      <svg style={{ ...style, left: x, top: y }}>
        <circle cx={radius} cy={radius} r={radius} stroke="black" strokeWidth="1" fill="transparent" />
      </svg>
    );
  }
}
