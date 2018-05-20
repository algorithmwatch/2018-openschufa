import DataForm from './DataForm';
import { connect } from 'react-redux';
import { setProp } from '../../actions';

const mapStateToProps = state => {
  const { language } = state.intl;
  const { surveyData } = state.form;
  return { language, surveyData };
};

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (name, value) => dispatch(setProp(name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataForm);
