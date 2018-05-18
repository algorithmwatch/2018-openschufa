import { connect } from 'react-redux';
import {
  openModal,
} from "../../actions";
import Usage from "./Usage";


const mapDispatchToProps = (dispatch) => {
  return {
    openModal: id => dispatch(openModal(id)),
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Usage);
