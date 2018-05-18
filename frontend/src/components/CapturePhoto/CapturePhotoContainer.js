import CapturePhoto from './CapturePhoto';
import { connect } from 'react-redux';
import { selectFile } from '../../actions/photo';


const mapStateToProps = (state) => {
  // const {} = state.photo;
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectFile: (file) => dispatch(selectFile(file))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CapturePhoto);
