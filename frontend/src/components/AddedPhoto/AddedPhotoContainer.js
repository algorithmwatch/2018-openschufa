import AddPhoto from './AddedPhoto';
import { connect } from 'react-redux';
import { setActiveStep } from '../../actions';


const mapDispatchToProps = dispatch => {
  return {
    setActiveStep: step => dispatch(setActiveStep(step)),
  }
};

export default connect(
  null,
  mapDispatchToProps
)(AddPhoto);
