import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ProgressBar from '../ProgressBar';
import Tip from './Tip';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  image: {
    marginTop: 10,
    maxWidth: '100%',
  },
  button: {
    marginTop: 12,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

class CapturePhoto extends Component {
  onChange = e => {
    const { selectFile } = this.props;
    const input = e.currentTarget;
    const file = input.files[0];
    selectFile(file);
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ marginTop: 6 }}>
        <Paper className={classes.root} elevation={0}>
          <ProgressBar stepsFinished={1} />
          <Typography variant="title" gutterBottom>
            <FormattedMessage
              id="Capture.title"
              defaultMessage="Consider the following"
            />
          </Typography>

          <Tip bullet="1" style={{ marginTop: '2rem' }}>
            <FormattedMessage id="Capture.one" defaultMessage="sharp" />
          </Tip>

          <Tip bullet="2">
            <FormattedMessage id="Capture.two" defaultMessage="bright" />
          </Tip>

          <Tip bullet="3">
            <FormattedMessage id="Capture.three" defaultMessage="straight" />
          </Tip>

          <div className={classes.buttonContainer}>
            <Button
              color="primary"
              variant="raised"
              component="label"
              className={classes.button}
            >
              <span
                style={{
                  color: 'white',
                  padding: '.5rem',
                  textTransform: 'none',
                }}
              >
                <FormattedMessage
                  id="Capture.takephotobutton"
                  defaultMessage="Press to take photo"
                />
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={this.onChange}
                style={{ display: 'none' }}
              />
            </Button>
          </div>

          <Tip bullet="!" style={{ marginTop: '3rem' }}>
            <FormattedMessage id="Capture.four" defaultMessage="no blacking" />
          </Tip>
        </Paper>
      </div>
    );
  }
}

CapturePhoto.propTypes = {
  selectFile: PropTypes.func.isRequired,
};

export default withStyles(styles)(CapturePhoto);
