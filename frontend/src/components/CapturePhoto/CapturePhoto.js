import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import {FormattedMessage} from 'react-intl';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import photo from '../../images/which_pages_to_take.jpg';
import ProgressBar from '../ProgressBar';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
  }),
  image: {
    marginTop: 10,
    maxWidth: '100%'
  },
  button: {
    marginTop: 12
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
});


class CapturePhoto extends Component {

  onChange = (e) => {
    const { displayCapturedPhoto } = this.props;
    const input = e.currentTarget;
    const file = input.files[0];
    displayCapturedPhoto(file);
  };

  render() {

    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={0}>
          <ProgressBar stepsFinished={1}/>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage
              id="Capture.p1"
              defaultMessage="Please only send those SCHUFA pages that do not show the SCHUFA-Logo ..."
            />
          </Typography>
          <img src={photo} alt='' className={classes.image}/>
          <div className={classes.buttonContainer}>
          <Button
            color='primary'
            variant='raised'
            component='label'
            className={classes.button}
          >
            <FormattedMessage
              id="Capture.takephotobutton"
              defaultMessage="Press to take photo"
            />
            <input
              type="file"
              accept="image/*"
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
  displayCapturedPhoto: PropTypes.func.isRequired
};


export default withStyles(styles)(CapturePhoto);
