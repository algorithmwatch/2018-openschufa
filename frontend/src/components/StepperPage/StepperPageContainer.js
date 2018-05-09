import StepperPage from './StepperPage'
import { connect } from 'react-redux';

import {
  setActiveStep,
  savePhoto,
  sendData,
  resetForm,
  resetFinished
} from "../../actions";


const mapStateToProps = state => {
  const { activeStep } = state.stepper;
  const hasImages = Boolean(state.form.imageData.length > 0 || state.photo.imageData);
  return {activeStep, hasImages} ;
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveStep: step => dispatch(setActiveStep(step)),
    savePhoto: () => dispatch(savePhoto()),
    sendData: () => dispatch(sendData()),
    resetForm: () => dispatch(resetForm()),
    resetFinished: () => dispatch(resetFinished())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepperPage);
