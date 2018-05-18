import AddPhoto from './AddedPhoto';
import { connect } from 'react-redux';
import { setActiveStep, selectFile } from '../../actions';


const mapStateToProps = state => {
  return {
    imageData: state.form.imageData
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveStep: step => dispatch(setActiveStep(step)),
    selectFile: (file) => dispatch(selectFile(file))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhoto);
