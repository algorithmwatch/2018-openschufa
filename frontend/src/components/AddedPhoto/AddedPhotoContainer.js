import AddPhoto from './AddedPhoto';
import { connect } from 'react-redux';
import { setActiveStep } from '../../actions';


const mapStateToProps = state => {
  return {
    numberOfPhotos: state.form.imageData.length
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveStep: step => dispatch(setActiveStep(step)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhoto);
