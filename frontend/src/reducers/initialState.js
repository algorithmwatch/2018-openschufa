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
      yearOfBirth: 'not-specified',
      sex: 'not-specified',
      familyStatus: 'not-specified',
      nationality: '',
      migrationBackground: 0,
      numberOfChildren: '',
      employment: 'not-specified',
      monthlyIncome: 0,
      housing: 'not-specified',
      relocation: 'not-specified',
      numberOfActiveLoans: 'not-specified',
      activeLoanAmount: 0,
      numberOfPaidOffLoans: 'not-specified',
      paidOffLoanAmount: 0,
      numberOfMobileContracts: 'not-specified',
      numberOfGiroAccounts: 'not-specified',
      numberOfCreditCards: 'not-specified',
      mailOrder: 0,
      admonition: 0,
      cashing: 0,
      executionProceedings: 0,
      insolvencyProceedings: 0,
    },
    imageData: [],
    uuid: "",
    formUploadErrorMessage: "",
    isUploading: false,
    uploadProgress: 0,
    loaded: 0
  },
  finished: {
    sentEmail: false,
    emailErrorMessage: ""
  }
};
