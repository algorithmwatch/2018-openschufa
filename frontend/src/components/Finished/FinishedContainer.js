import Finished from './Finished';
import { connect } from 'react-redux';
import {sendData, sendID} from "../../actions";


const mapStateToProps = state => {
  const { uuid, formUploadErrorMessage, isUploading, loaded, uploadProgress } = state.form;
  const { sentEmail, emailErrorMessage } = state.finished;
  return { uuid, sentEmail, emailErrorMessage, formUploadErrorMessage, isUploading, uploadProgress, loaded } ;
};

const mapDispatchToProps = dispatch => {
  return {
    send: email => dispatch(sendID(email)),
    sendData: () => dispatch(sendData()),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Finished);
