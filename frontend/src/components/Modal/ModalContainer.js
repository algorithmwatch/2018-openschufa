import Modal from './Modal';
import { connect } from 'react-redux';
import { closeModal } from '../../actions';

const mapStateToProps = state => {
  const { open, id } = state.modal;
  const currentLanguage = state.intl.language;
  return { open, id, currentLanguage };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
