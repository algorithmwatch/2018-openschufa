import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import brushSVG from './noun_1551627.svg';
import styles from './RotatePhoto.css';


class RotatePhoto extends Component {

  onClickImage = () => {
    let {rotation, rotatePhoto} = this.props;
    rotation = (rotation + 90) % 360;
    rotatePhoto(rotation);
  };

  render() {
    const {imageData, size, rotation} = this.props;

    let maxWidth = 1;
    let maxHeight = 1;
    if (rotation === 90 || rotation === 270) {
      maxWidth = size.width / size.height;
      maxHeight = 1 / maxWidth;
    }

    const photoStyle = {
      transform: `rotate(${rotation}deg) translate(-50%, -50%)`,
      maxHeight: `${maxHeight * 100}%`,
      maxWidth: `${maxWidth * 100}%`
    };

    return (
      <div className={styles.container}>

        <div className={styles.debug}>
          {size.width} x {size.height}, {rotation}°
        </div>

        <img
          className={styles.photo}
          src={imageData}
          style={photoStyle}
          alt="capture"
          onClick={this.onClickImage}
        />

        <div className={styles.toolbar}>

          <div className={styles.button} onClick={this.onClickImage}>
            <Button variant="fab" aria-label="paint">
              <img width="35" src={'data:image/svg+xml;utf8,' + brushSVG} alt=""/>
            </Button>
          </div>

        </div>

      </div>
    );
  }
}

RotatePhoto.propTypes = {
  imageData: PropTypes.string.isRequired,
  rotation: PropTypes.oneOf([0, 90, 180, 270]).isRequired,
  size: PropTypes.object.isRequired,
  rotatePhoto: PropTypes.func.isRequired,
};


export default RotatePhoto;

