import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './PaintPhoto.css';
import PinchZoom from './pinch-zoom';
import simplify from 'simplify-js';
import Button from 'material-ui/Button';
import ZoomIcon from '@material-ui/icons/ZoomIn';
import UndoIcon from '@material-ui/icons/Undo';
import brushSVG from './noun_721104.svg';
import PaintCursor from './PaintCursor';
import { MODE_ZOOM, MODE_PAINT } from '../../constants';

const BRUSH_WIDTH = 40;

function translate(p, t) {
  return {
    x: p.x + t.x,
    y: p.y + t.y,
  };
}

function scale(p, s) {
  return {
    x: p.x * s,
    y: p.y * s,
  };
}

class PaintPhoto extends Component {
  state = {
    mouseOver: false,
  };

  componentDidMount() {
    const { polylines } = this.props;
    this.initZoom();
    this.drawPolylines(polylines);
    this.currentPoint = null;
    this.firstTouch = null;

    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }

  componentWillUnmount() {
    window.oncontextmenu = false;
  }

  initZoom() {
    const { editMode } = this.props;
    const canvas = this.refs.photoContainer;
    this.pinchzoom = new PinchZoom(canvas, {
      zoomOutFactor: 1,
      minZoom: 1,
      maxZoom: 8,
    });

    if (editMode !== MODE_ZOOM) {
      this.pinchzoom.disable();
    }
  }

  drawPolylines(polylines) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = ctx.lineJoin = 'round';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    polylines.forEach(polyline => {
      ctx.lineWidth = polyline.lineWidth;
      ctx.beginPath();
      ctx.moveTo(polyline.points[0].x, polyline.points[0].y);
      polyline.points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    });
  }

  componentWillReceiveProps(nextProps, nextState) {
    const [now, nxt] = [this.props, nextProps];
    if (now.editMode !== nxt.editMode) {
      if (nxt.editMode === MODE_ZOOM) {
        this.pinchzoom.enable();
      } else {
        this.pinchzoom.disable();
      }
    }
    if (now.polylines !== nxt.polylines) {
      this.drawPolylines(nxt.polylines);
    }
  }

  getZoomContainerScale() {
    return Number(
      this.pinchzoom.el.style.transform.split('scale(')[1].split(',')[0]
    );
  }

  containerToCanvas = p => {
    const rect = this.refs.container.getBoundingClientRect();
    p = translate(p, { x: -rect.left, y: -rect.top });
    const s = this.getZoomContainerScale();
    const offset = this.pinchzoom.offset;
    p = translate(p, offset);
    return scale(p, 1 / s);
  };

  onMouseDown = e => {
    e.preventDefault();
    document.body.addEventListener('mousemove', this.onMouseMove);
    document.body.addEventListener('mouseup', this.onMouseUp);
    this.drawStart({ x: e.clientX, y: e.clientY });
  };

  onTouchStart = e => {
    e.preventDefault();
    if (this.firstTouch) return;
    if (e.touches.length > 1) return;
    const touch = e.touches[0];
    this.firstTouch = touch;
    this.drawStart({ x: touch.clientX, y: touch.clientY });
  };

  drawStart(p) {
    const p_ = this.containerToCanvas(p);
    this.currentPoint = p_;
    this.currentLineWidth = BRUSH_WIDTH / this.getZoomContainerScale();
    this.currentPolyline = {
      lineWidth: this.currentLineWidth,
      points: [p_],
    };
  }

  onMouseMove = e => {
    this.drawMove({ x: e.clientX, y: e.clientY });
  };

  onTouchMove = e => {
    e.preventDefault();

    if (!this.firstTouch) return;
    const touch = Array.from(e.touches).find(
      t => t.identifier === this.firstTouch.identifier
    );
    if (!touch) {
      return;
    }

    this.drawMove({ x: touch.clientX, y: touch.clientY });
  };

  drawMove(p) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    const p0 = this.currentPoint;
    const p1 = this.containerToCanvas(p);

    ctx.lineWidth = this.currentLineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();

    this.currentPoint = p1;
    this.currentPolyline.points.push(p1);
  }

  onMouseUp = () => {
    document.body.removeEventListener('mousemove', this.onMouseMove);
    document.body.removeEventListener('mouseup', this.onMouseUp);
    this.drawEnd();
  };

  onTouchEnd = e => {
    e.preventDefault();

    if (!this.firstTouch) return;
    const touch = Array.from(e.touches).find(
      t => t.identifier === this.firstTouch.identifier
    );
    if (touch) {
      return;
    }

    this.drawEnd();
  };

  drawEnd() {
    const { addPolyline } = this.props;
    const { lineWidth, points } = this.currentPolyline;

    addPolyline({
      lineWidth,
      points: simplify(points, 1 / this.getZoomContainerScale()),
    });

    this.currentPolyline = null;
    this.currentPoint = null;
    this.firstTouch = null;
  }

  onMouseOver = e => {
    this.setState({ mouseOver: true });
  };

  onMouseOut = e => {
    this.setState({ mouseOver: false });
  };

  stopPropagation(e) {
    e.stopPropagation();
  }

  undoPolyline = e => {
    const { undoPolyline } = this.props;
    undoPolyline();
    e.stopPropagation();
  };

  render() {
    const {
      editMode,
      imageData,
      size,
      rotation,
      setModeZoom,
      setModePaint,
    } = this.props;
    const editModeZoom = editMode === MODE_ZOOM;
    const editModePaint = editMode === MODE_PAINT;
    const { mouseOver } = this.state;

    let containerStyle = {};
    let containerListeners = {};
    let buttonListeners = {};

    if (editModePaint) {
      containerStyle = {
        cursor: 'none',
      };
      containerListeners = {
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        onMouseDown: this.onMouseDown,
        onMouseOver: this.onMouseOver,
        onMouseOut: this.onMouseOut,
      };
      buttonListeners = {
        onMouseOver: this.stopPropagation,
        onMouseOut: this.stopPropagation,
      };
    }

    let { width, height } = size;
    const [tx, ty] = {
      0: [0, 0],
      90: [0, -100],
      180: [-100, -100],
      270: [-100, 0],
    }[rotation];

    const photoStyle = {
      width,
      height,
      transform: `rotate(${rotation}deg) translate(${tx}%, ${ty}%)`,
    };

    if (rotation === 90 || rotation === 270) {
      [width, height] = [height, width];
    }

    return (
      <div
        ref="container"
        className={styles.container}
        {...containerListeners}
        style={containerStyle}
      >
        {editModePaint && mouseOver && <PaintCursor />}

        <div className={styles.debug}>
          {size.width} x {size.height}, {rotation}°
        </div>

        <div ref="photoContainer" style={{ width, height }}>
          <img
            className={styles.photo}
            style={photoStyle}
            src={imageData}
            alt=""
          />
          <canvas
            className={styles.canvas}
            ref="canvas"
            {...{ width, height }}
          />
        </div>

        <div
          className={styles.toolbar}
          onTouchStart={this.stopPropagation}
          onTouchMove={this.stopPropagation}
          onTouchEnd={this.stopPropagation}
          onMouseDown={this.stopPropagation}
        >
          <div
            className={styles.button}
            onClick={setModeZoom}
            {...buttonListeners}
          >
            <Button
              variant="fab"
              color={editModeZoom ? 'primary' : 'default'}
              aria-label="paint"
            >
              <ZoomIcon />
            </Button>
          </div>

          <div
            className={styles.button}
            onClick={setModePaint}
            {...buttonListeners}
          >
            <Button
              variant="fab"
              color={editModePaint ? 'primary' : 'default'}
              aria-label="paint"
            >
              <img
                width="35"
                src={'data:image/svg+xml;utf8,' + brushSVG}
                alt=""
              />
            </Button>
          </div>

          <div
            className={styles.button}
            onClick={this.undoPolyline}
            {...buttonListeners}
          >
            <Button variant="fab" aria-label="paint">
              <UndoIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

PaintPhoto.propTypes = {
  editMode: PropTypes.string.isRequired,
  imageData: PropTypes.string.isRequired,
  rotation: PropTypes.oneOf([0, 90, 180, 270]).isRequired,
  size: PropTypes.object.isRequired,
  polylines: PropTypes.array.isRequired,
  setModeZoom: PropTypes.func.isRequired,
  setModePaint: PropTypes.func.isRequired,
  addPolyline: PropTypes.func.isRequired,
  undoPolyline: PropTypes.func.isRequired,
};

export default PaintPhoto;
