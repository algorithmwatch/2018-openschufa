import { STEP_USAGE, MODE_ZOOM } from '../constants';
import {languageWithoutRegionCode, messages} from "../i18nsetup";


export default {
  photo: {
    imageData: null,
    size: null,
    rotation: null,
    processing: false,
    editMode: MODE_ZOOM,
    polylines: []
  },
  modal: {
    open: false,
    title: "",
    text: ""
  },
  intl: {
    language: languageWithoutRegionCode,
    messages: messages
  },
  stepper: {
    activeStep: STEP_USAGE
  },
  form: {
    surveyData: {
      schufaDate: new Date(),
      plz: '',
      yearOfBirth: '',
      sex: 'not-specified',
      married: false,
      nationality: '',
      migrationBackground: 0,
      numberOfChildren: '',
      employment: 'not-specified',
      monthlyIncome: 0,
      housing: 'not-specified',
      relocation: 0,
      numberOfActiveLoans: 0,
      activeLoanAmount: 0,
      numberOfPaidOffLoans: 0,
      paidOffLoanAmount: 0,
      numberOfMobileContracts: 0,
      numberOfGiroAccounts: 0,
      numberOfCreditCards: 0,
      mailOrder: 0,
      admonition: 0,
      cashing: 0,
      executionProceedings: 0,
      insolvencyProceedings: 0,
    },
    imageData: [],
    uuid: "",
    formUploadErrorMessage: "",
    isUploading: false
  },
  finished: {
    sentEmail: false,
    emailErrorMessage: ""
  }
};
