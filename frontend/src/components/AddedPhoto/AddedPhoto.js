import React from 'react';
import {FormattedMessage} from 'react-intl';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {STEP_CAPTURE, STEP_FORM} from "../../constants";


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
  }),
  button: {
    margin: theme.spacing.unit,
    width: '10rem'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
});

const AddedPhoto = ({classes, setActiveStep}) => {

  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Typography variant="title" gutterBottom>
          <FormattedMessage
            id="AddedPhoto.header"
            defaultMessage="Photo added"
          />
        </Typography>
        <Typography variant="body1" gutterBottom>
          <FormattedMessage
            id="AddedPhoto.p1"
            defaultMessage="Click on 'ANOTHER PHOTO' to take another photo."
          />
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            color='primary'
            variant='raised'
            className={classes.button}
            onClick={() => setActiveStep(STEP_CAPTURE)}
          >
            <FormattedMessage
              id="AddPhoto.addphoto"
              defaultMessage="Another photo"
            />
          </Button>
        </div>
        <Typography variant="body1" gutterBottom>
          <FormattedMessage
            id="AddedPhoto.p2"
            defaultMessage="Click on 'TO SURVEY' to anwser a few questions before you send your data."
          />
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            color='primary'
            variant='raised'
            className={classes.button}
            onClick={() => setActiveStep(STEP_FORM)}
          >
            <FormattedMessage
              id="AddPhoto.survey"
              defaultMessage="To survey"
            />
          </Button>
        </div>
      </Paper>
    </div>
  )

};

export default withStyles(styles)(AddedPhoto);
