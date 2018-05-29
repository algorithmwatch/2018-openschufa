import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const mapStateToProps = state => {
  const { language, messages } = state.intl;
  return { key: language, locale: language, messages };
};

export default connect(mapStateToProps)(IntlProvider);
