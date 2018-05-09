import RotatePhoto from './RotatePhoto';
import { connect } from 'react-redux';
import { rotatePhoto } from '../../actions/photo';


const mapStateToProps = (state) => {
  const { imageData, size, rotation } = state.photo;
  return {
    imageData,
    size,
    rotation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    rotatePhoto: (degrees) => dispatch(rotatePhoto(degrees)),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RotatePhoto);
