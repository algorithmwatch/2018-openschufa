import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormattedMessage } from 'react-intl';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import photo from '../../images/which_pages_to_take.jpg';
import ProgressBar from '../ProgressBar';

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
          <div style={{ marginTop: '2rem' }}>
            <Typography variant="title" gutterBottom>
              1
            </Typography>
          </div>
          <div
            style={{
              position: 'relative',
              left: 30,
              bottom: 30,
              marginRight: 30,
            }}
          >
            <Typography variant="body1" gutterBottom>
              <FormattedMessage
                id="Capture.one"
                defaultMessage="Please only send those SCHUFA pages that do not show the SCHUFA-Logo ..."
              />
            </Typography>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <Typography variant="title" gutterBottom>
              2
            </Typography>
          </div>
          <div
            style={{
              position: 'relative',
              left: 30,
              bottom: 30,
              marginRight: 30,
            }}
          >
            <Typography variant="body1" gutterBottom>
              <FormattedMessage
                id="Capture.two"
                defaultMessage="Please only send those SCHUFA pages that do not show the SCHUFA-Logo ..."
              />
            </Typography>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <Typography variant="title" gutterBottom>
              3
            </Typography>
          </div>
          <div
            style={{
              position: 'relative',
              left: 30,
              bottom: 30,
              marginRight: 30,
            }}
          >
            <Typography variant="body1" gutterBottom>
              <FormattedMessage
                id="Capture.three"
                defaultMessage="Please only send those SCHUFA pages that do not show the SCHUFA-Logo ..."
              />
            </Typography>
          </div>
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
        </Paper>
      </div>
    );
  }
}

CapturePhoto.propTypes = {
  selectFile: PropTypes.func.isRequired,
};

export default withStyles(styles)(CapturePhoto);
