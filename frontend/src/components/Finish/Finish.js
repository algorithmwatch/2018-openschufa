import React, { Component } from 'react';
import { FormattedMessage, injectIntl, defineMessages } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, FormGroup } from 'material-ui';
import ProgressBar from '../ProgressBar';

const inlineStyles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  button: {
    margin: theme.spacing.unit,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

const messages = defineMessages({
  checkboxLabel: {
    id: 'Finish.checkboxlabel',
    defaultMessage: 'Accept privacy agreement',
  },
});

class Finish extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    checked: false,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, openModal, sendData } = this.props;
    const { formatMessage } = this.props.intl;
    const { checked } = this.state;

    return (
      <div style={{ marginTop: 6 }}>
        <Paper className={classes.root} elevation={0}>
          <ProgressBar stepsFinished={3} />
          <Typography variant="title" gutterBottom>
            <FormattedMessage id="Finish.header" defaultMessage="Finish" />
          </Typography>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage
              id="Finish.p1"
              defaultMessage="Please read the data privacy agreement and click the checkbutton to confirm."
            />
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              color="default"
              variant="raised"
              className={classes.button}
              onClick={() => openModal('privacyagreement')}
            >
              <span style={{ textTransform: 'none' }}>
                <FormattedMessage
                  id="Finish.privacyagreementbutton"
                  defaultMessage="Show privacy agreement"
                />
              </span>
            </Button>
          </div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={this.handleChange('checked')}
                  value="checked"
                />
              }
              label={formatMessage(messages.checkboxLabel)}
            />
          </FormGroup>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage
              id="Finish.p2"
              defaultMessage="Click on 'SEND' to send your data."
            />
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              color="primary"
              variant="raised"
              className={classes.button}
              onClick={() => sendData()}
              disabled={!checked}
            >
              <span style={{ textTransform: 'none' }}>
                <FormattedMessage
                  id="Finish.sendbutton"
                  defaultMessage="Send"
                />
              </span>
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(inlineStyles)(injectIntl(Finish));
