import { connect } from 'react-redux';
import MainAppBar from "../MainAppBar/MainAppBar";


import {
  openModal
} from "../../actions";


const mapDispatchToProps = (dispatch) => {
  return {
    openModal: id => dispatch(openModal(id)),
  }
};

export default connect(
  null,
  mapDispatchToProps
)(MainAppBar);
