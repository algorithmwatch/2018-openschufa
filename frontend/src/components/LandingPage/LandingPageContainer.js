import LandingPage from './LandingPage';
import { connect } from 'react-redux';
import {
  openModal,
  switchLanguage,
  resetForm, setActiveStep, resetFinished
} from "../../actions";


const mapStateToProps = state => {
  return {
    currentLanguage: state.intl.language
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: id => dispatch(openModal(id)),
    switchLanguage: language => dispatch(switchLanguage(language)),
    setActiveStep: step => dispatch(setActiveStep(step)),
    resetForm: () => dispatch(resetForm()),
    resetFinished: () => dispatch(resetFinished())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
