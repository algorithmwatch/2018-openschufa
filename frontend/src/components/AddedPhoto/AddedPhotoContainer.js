import AddPhoto from './AddedPhoto';
import { connect } from 'react-redux';
import { setActiveStep, displayCapturedPhoto } from '../../actions';


const mapStateToProps = state => {
  return {
    numberOfPhotos: state.form.imageData.length
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveStep: step => dispatch(setActiveStep(step)),
    displayCapturedPhoto: (imageData) => dispatch(displayCapturedPhoto(imageData))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhoto);
