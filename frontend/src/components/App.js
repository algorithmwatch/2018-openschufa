import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPageContainer';
import Stepper from './StepperPage/StepperPageContainer';
import Modal from './Modal/ModalContainer';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { openModal } from '../actions';
import { connect } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffea4c',
      main: '#f0b800',
      dark: '#b98900',
      contrastText: '#000',
    },
    secondary: {
      light: '#4573ac',
      main: '#00487c',
      dark: '#00214f',
      contrastText: '#fff',
    },
  },
});

theme.overrides = {
  Index: {
    button: {
      marginBottom: 20,
    },
  },
  MuiButton: {
    // Name of the component ⚛️ / style shee
    raised: {
      boxShadow: theme.shadows[0],
    },
  },
};

// To get URLs to link to, we create dummy components that open the modal.
// This is very hacky but because of the project setup, it's not easy to get
// this done now...
const SimpleGoBack = () => (
  <div>
    <a href="../">Go back</a>
  </div>
);

class FaqPage extends Component {
  componentDidMount() {
    this.props.dispatch(openModal('faq'));
  }

  render() {
    return <SimpleGoBack />;
  }
}

const connectedFaqPage = connect()(FaqPage);

class InformationPage extends Component {
  componentDidMount() {
    this.props.dispatch(openModal('openschufa'));
  }

  render() {
    return <SimpleGoBack />;
  }
}

const connectedInformationPage = connect()(InformationPage);

class ImprintPage extends Component {
  componentDidMount() {
    this.props.dispatch(openModal('imprint'));
  }

  render() {
    return <SimpleGoBack />;
  }
}

const connectedImprintPage = connect()(ImprintPage);

class PrivacyPage extends Component {
  componentDidMount() {
    this.props.dispatch(openModal('dataprivacy'));
  }

  render() {
    return <SimpleGoBack />;
  }
}

const connectedPrivacyPage = connect()(PrivacyPage);

class PrivacyAgreementPage extends Component {
  componentDidMount() {
    this.props.dispatch(openModal('privacyagreement'));
  }

  render() {
    return <SimpleGoBack />;
  }
}

const connectedPrivacyAgreementPage = connect()(PrivacyAgreementPage);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/steps" component={Stepper} />
            <Route path="/faq" component={connectedFaqPage} />
            <Route path="/information" component={connectedInformationPage} />
            <Route path="/imprint" component={connectedImprintPage} />
            <Route path="/privacy" component={connectedPrivacyPage} />
            <Route
              path="/privacyagreement"
              component={connectedPrivacyAgreementPage}
            />
          </Switch>
        </Router>
        <Modal />
      </MuiThemeProvider>
    );
  }
}

export default App;
