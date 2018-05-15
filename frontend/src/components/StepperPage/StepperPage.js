import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Prompt} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {defineMessages, injectIntl} from 'react-intl';
import Usage from "../Usage/Usage";
import CapturePhoto from '../CapturePhoto/CapturePhotoContainer';
import RotatePhoto from '../RotatePhoto/RotatePhotoContainer';
import PaintPhoto from '../PaintPhoto/PaintPhotoContainer';
import AddedPhoto from '../AddedPhoto/AddedPhotoContainer';
import DataForm from "../DataForm/DataFormContainer";
import Finish from '../Finish/FinishContainer';
import MainAppBar from "../MainAppBar/MainAppBarContainer";
import styles from "./StepperPage.css";
import {
  STEP_CAPTURE, STEP_PAINT, STEP_ROTATE, STEP_SAVED,
  STEP_FINISHED, STEP_FORM, STEP_OVERVIEW, STEP_USAGE
} from "../../constants";
import Finished from "../Finished/FinishedContainer";


const steps = [
  STEP_USAGE,
  STEP_CAPTURE,
  STEP_ROTATE,
  STEP_PAINT,
  STEP_SAVED,
  STEP_FORM,
  STEP_OVERVIEW,
  STEP_FINISHED
];

const inlineStyles = theme => ({
  header: {
    flex: '0 0 auto'
  },
  footer: {
    display: 'flex',
    flex: '0 0 auto',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    justifyContent: 'space-between',
    minHeight: 50,
    alignItems: 'flex-start'
  },
  content: {
    flex: '1 1 auto',
    position: 'relative', /* need this to position inner content */
    overflowY: 'auto'
  }
});

const messages = defineMessages({
  usageButton: {
    id: 'StepperPage.usagebutton',
    defaultMessage: 'Usage'
  },
  captureButton: {
    id: 'StepperPage.capturebutton',
    defaultMessage: 'Add photo'
  },
  resetButton: {
    id: 'StepperPage.resetbutton',
    defaultMessage: 'Reset'
  },
  rotateButton: {
    id: 'StepperPage.rotatebutton',
    defaultMessage: 'Rotate'
  },
  paintButton: {
    id: 'StepperPage.paintbutton',
    defaultMessage: 'Blacken'
  },
  saveImageButton: {
    id: 'StepperPage.saveimagebutton',
    defaultMessage: 'Save Image'
  },
  formButton: {
    id: 'StepperPage.formbutton',
    defaultMessage: 'Form'
  },
  overviewButton: {
    id: 'StepperPage.overviewbutton',
    defaultMessage: 'Finish'
  },
  finishButton: {
    id: 'StepperPage.finishbutton',
    defaultMessage: 'Send data'
  },
  prompt: {
    id: 'StepperPage.prompt',
    defaultMessage: 'Are you sure you wanna do that? All changes will be lost if you continue!'
  }
});

function getStepContent(step) {
  switch (step) {
    case STEP_USAGE:
      return {
        component: <Usage/>,
        nextBtn: messages.captureButton
      };
    case STEP_CAPTURE:
      return {
        component: <CapturePhoto/>,
        prevBtn: messages.usageButton
      };
    case STEP_ROTATE:
      return {
        component: <RotatePhoto/>,
        prevBtn: messages.resetButton,
        nextBtn: messages.paintButton
      };
    case STEP_PAINT:
      return {
        component: <PaintPhoto/>,
        prevBtn: messages.rotateButton,
        nextBtn: messages.saveImageButton
      };
    case STEP_SAVED:
      return {
        component: <AddedPhoto/>,
        prevBtn: messages.captureButton,
        nextBtn: messages.formButton
      };
    case STEP_FORM:
      return {
        component: <DataForm/>,
        prevBtn: messages.captureButton,
        nextBtn: messages.overviewButton
      };
    case STEP_OVERVIEW:
      return {
        component: <Finish/>,
        prevBtn: messages.formButton,
        nextBtn: messages.finishButton
      };
    case STEP_FINISHED:
      return {
        component: <Finished/>,
        prevBtn: messages.captureButton
      };
    default:
      return {component: 'Unknown step'};
  }
}

class StepperPage extends Component {

  static propTypes = {
    activeStep: PropTypes.oneOf([
      STEP_USAGE, STEP_PAINT, STEP_ROTATE, STEP_CAPTURE, STEP_SAVED, STEP_FORM,
      STEP_OVERVIEW, STEP_FINISHED]).isRequired,
    classes: PropTypes.object,
    theme: PropTypes.object,
    intl: PropTypes.object
  };

  handleNext = () => {
    const {activeStep, setActiveStep, savePhoto, sendData} = this.props;
    const nextStep = steps[steps.indexOf(activeStep) + 1];
    setActiveStep(nextStep);
    if (nextStep === STEP_SAVED)
      savePhoto();
    if (nextStep === STEP_FINISHED)
      sendData()
  };

  handleBack = () => {
    const {activeStep, setActiveStep, resetForm, resetFinished} = this.props;
    const prevStep = [STEP_SAVED, STEP_FORM, STEP_FINISHED].includes(activeStep) ?
      STEP_CAPTURE :
      steps[steps.indexOf(activeStep) - 1];
    if (activeStep === STEP_FINISHED)
      resetForm();
    resetFinished();
    setActiveStep(prevStep);
  };

  render() {

    const {classes, theme, activeStep, hasImages} = this.props;
    const {formatMessage} = this.props.intl;
    const stepObj = getStepContent(activeStep);
    const when = hasImages && activeStep !== STEP_FINISHED;

    const backButton = [STEP_USAGE].includes(activeStep) ?
      <div/> :
      <Button size="small" onClick={this.handleBack}>
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
        {formatMessage(stepObj.prevBtn)}
      </Button>;
    const nextButton = [STEP_CAPTURE, STEP_OVERVIEW, STEP_FINISHED].includes(activeStep) ?
      <div/> :
      <Button size="small" onClick={this.handleNext}>
        {formatMessage(stepObj.nextBtn)}
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </Button>;

    return (
      <div className={styles.root}>
        <Prompt
          when={when}
          message={formatMessage(messages.prompt)}/>
        <MainAppBar className={classes.header}/>
        <div className={classes.content}>
          {stepObj.component}
        </div>
        {![STEP_SAVED, STEP_FINISHED].includes(activeStep) &&
        <div className={classes.footer}>
          {backButton}
          {nextButton}
        </div>
        }
      </div>
    );
  }
}

export default withStyles(inlineStyles, {withTheme: true})(injectIntl(StepperPage));
