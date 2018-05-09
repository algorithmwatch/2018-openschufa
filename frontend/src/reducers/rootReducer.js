import {combineReducers} from 'redux';
import photo from './photoReducer';
import modal from './modalReducer';
import intl from './intlReducer';
import stepper from './stepperReducer';
import form from './formReducer';
import finished from './finishedReducer';


const rootReducer = combineReducers({
  photo,
  modal,
  intl,
  stepper,
  form,
  finished
});


export default rootReducer;
