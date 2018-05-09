import React, {Component} from 'react';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import PropTypes from "prop-types";
import {Checkbox, FormControlLabel, FormGroup} from "material-ui";


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
  }),
  button: {
    margin: theme.spacing.unit,
  },
});

const messages = defineMessages({
  checkboxLabel: {
    id: 'Finish.checkboxlabel',
    defaultMessage: 'Accept privacy agreement'
  },
});

class Finish extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    checked: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {

    const { classes, openModal, sendData} = this.props;
    const { formatMessage } = this.props.intl;
    const { checked } = this.state;

    return (
      <div>
        <Paper className={classes.root} elevation={0}>
          <Typography variant="title" gutterBottom>
            <FormattedMessage
              id="Finish.header"
              defaultMessage="Finish"
            />
          </Typography>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage
              id="Finish.p1"
              defaultMessage="Please read the data privacy agreement and click the checkbutton to confirm."
            />
          </Typography>
          <Button
            color='default'
            variant='raised'
            className={classes.button}
            onClick={() => openModal('privacyagreement')}
          >
            <FormattedMessage
              id="Finish.privacyagreementbutton"
              defaultMessage="Show privacy agreement"
            />
          </Button>
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
          <Button
            color='primary'
            variant='raised'
            className={classes.button}
            onClick={() => sendData()}
            disabled={!checked}
          >
            <FormattedMessage
              id="Finish.sendbutton"
              defaultMessage="Send"
            />
          </Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(injectIntl(Finish));
