import CapturePhoto from './CapturePhoto';
import { connect } from 'react-redux';
import { displayCapturedPhoto } from '../../actions/photo';


const mapStateToProps = (state) => {
  // const {} = state.photo;
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayCapturedPhoto: (imageData) => dispatch(displayCapturedPhoto(imageData))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CapturePhoto);
