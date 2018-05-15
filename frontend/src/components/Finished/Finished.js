import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import styles from './Finished.css';
import {formatBytes} from "../../utils/utilityFunctions";


const inlineStyles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
  }),
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  button: {
    margin: theme.spacing.unit,
    width: '10rem'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  progress: {
    width: '100%',
  },
  progressText: {
    marginTop: 10
  }
});

class Finished extends Component {

  static propTypes = {
    uuid: PropTypes.string
  };

  state = {
    email: ''
  };

  handleChange = event => {
    // noinspection JSCheckFunctionSignatures
    this.setState({email: event.target.value});
  };

  handleSubmit = event => {
    this.props.send(this.state.email);
  };

  sendForm = () => {
    this.props.sendData();
  };

  render() {

    const {
      uuid, sentEmail, emailErrorMessage, formUploadErrorMessage,
      isUploading, loaded, uploadProgress, classes
    } = this.props;
    const {formatMessage} = this.props.intl;
    const {email} = this.state;

    const messages = defineMessages({
      formEmail: {
        id: 'FinishedForm.email',
        defaultMessage: 'Your e-mail address'
      },
    });

    if (isUploading) {
      return (
        <div className={classes.progress}>
          <Paper className={classes.root} elevation={0}>
            <Typography variant="caption" gutterBottom>
              {formatBytes(loaded)}
            </Typography>
            <progress className={styles["Progress-main"]} value={uploadProgress} max="100">
              <div className={styles["Progress-bar"]} role="presentation">
                <span className={styles["Progress-value"]} style={{width: '80%'}}> </span>
              </div>
            </progress>
            <Typography className={classes.progressText} variant="body1" gutterBottom>
              <FormattedMessage
                id="Finished.uploadingnotification"
                defaultMessage="Your data are being uploaded, Please don't close your browser!"
              />
            </Typography>
          </Paper>
        </div>
      )
    } else {
      return (
        <div>
          <Paper className={classes.root} elevation={0}>
            {uuid &&
            <div>
              <Typography variant="subheading" gutterBottom>
                <FormattedMessage
                  id="Finished.header"
                  defaultMessage="Upload successful"
                />
              </Typography>
              <Typography variant="body1" gutterBottom>
                <FormattedMessage
                  id="Finished.notification"
                  defaultMessage="Your data has been sent successfully and stored with the following ID:"
                />
              </Typography>
              <Typography variant="body1">
                <strong>{uuid}</strong>
              </Typography>
              <div>
                <Typography>
                  <FormattedMessage
                    id="Finished.reminderquestion"
                    defaultMessage="If you want to receive a message with this ID, please enter your e-mail address below and click 'Send'."
                  />
                </Typography>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off">
                  <TextField
                    id="e-mail-address"
                    label={formatMessage(messages.formEmail)}
                    value={email}
                    onChange={this.handleChange}
                    type="email"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                  />
                  <div className={classes.buttonContainer}>
                    <Button
                      color='primary'
                      variant='raised'
                      className={classes.button}
                      onClick={this.handleSubmit}
                      disabled={email.trim() === ""}
                    >
                      <FormattedMessage
                        id="FinishedForm.sendemail"
                        defaultMessage="Send"
                      />
                    </Button>
                  </div>
                </form>
              </div>
              <Typography variant="body1" gutterBottom>
                <FormattedMessage
                  id="Finished.contact"
                  defaultMessage="If you have any questions, please contact us at {mail}."
                  values={{
                    mail:
                      <a href="mailto:support@openschufa.de">
                        support@openschufa.de
                      </a>
                  }}
                />
              </Typography>
              <Typography variant="body1" gutterBottom>
                <FormattedMessage
                  id="Finished.news"
                  defaultMessage="Latest news is available on {facebook} or {twitter}"
                  values={{
                    twitter:
                      <a href="https://twitter.com/openschufa" target="_blank" rel="noopener noreferrer">
                        <FormattedMessage
                          id="Finished.twitter"
                          defaultMessage="Twitter"
                        />
                      </a>,
                    facebook:
                      <a href="https://www.facebook.com/openschufa/" target="_blank" rel="noopener noreferrer">
                        <FormattedMessage
                          id="Finished.facebook"
                          defaultMessage="Facebook"
                        />
                      </a>
                  }}
                />
              </Typography>
            </div>
            }
            {formUploadErrorMessage &&
            <div>
              <Typography>
                <FormattedMessage
                  id="Finished.formuploaderror"
                  defaultMessage="Your data could not be uploaded:"
                />
              </Typography>
              <Typography color='error'>
                {formUploadErrorMessage}
              </Typography>
              <div className={classes.buttonContainer}>
                <Button
                  color='primary'
                  variant='raised'
                  className={classes.button}
                  onClick={this.sendForm}
                >
                  <FormattedMessage
                    id="FinishedForm.sendform"
                    defaultMessage="Send again"
                  />
                </Button>
              </div>
            </div>
            }
            {sentEmail && !emailErrorMessage &&
            <Typography>
              <FormattedMessage
                id="Finished.emailsent"
                defaultMessage="Your ID has been sent to the e-mail address given above. If you don't receive a message within a couple of minutes, please check your SPAM folder or if you misspelled your address!"
              />
            </Typography>
            }
            {emailErrorMessage &&
            <div>
              <Typography>
                <FormattedMessage
                  id="Finished.emailsenterror"
                  defaultMessage="There has something gone wrong while trying to send you an e-mail. Please check your address and try it again."
                />
              </Typography>
              <Typography color='error'>
                <div dangerouslySetInnerHTML={{__html: emailErrorMessage}}/>
              </Typography>
            </div>
            }
          </Paper>
        </div>
      )
    }
  }
}

export default withStyles(inlineStyles, {withTheme: true})(injectIntl(Finished));
