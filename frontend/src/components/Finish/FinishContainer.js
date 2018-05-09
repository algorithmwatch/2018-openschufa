import Finish from './Finish';
import { connect } from 'react-redux';
import { openModal, sendData} from '../../actions';


const mapDispatchToProps = dispatch => {
  return {
    openModal: id => dispatch(openModal(id)),
    sendData: () => dispatch(sendData()),
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Finish);
