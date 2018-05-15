import React from 'react';
import {FormattedMessage, FormattedNumber, FormattedPlural} from 'react-intl';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {STEP_CAPTURE, STEP_FORM} from "../../constants";
import CheckCircle from '@material-ui/icons/CheckCircle';
import green from 'material-ui/colors/green';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.default,
  }),
  button: {
    width: '10rem'
  },
  centerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
});

const AddedPhoto = ({classes, setActiveStep, numberOfPhotos}) => {

  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <div className={classes.centerContainer}>
          <CheckCircle style={{fill: green[700], width: '5em', height: '5em'}}/>
        </div>
        <Typography className={classes.centerContainer} variant="title" gutterBottom>
          <FormattedMessage
            id="AddedPhoto.header"
            defaultMessage="Thank you!"
          />
        </Typography>
        <Typography className={classes.centerContainer} variant="subheading" gutterBottom>
          <FormattedMessage
            id="AddedPhoto.subheading"
            defaultMessage="Your photo has been added."
          />
        </Typography>
        <Typography variant="body1" gutterBottom>
          <FormattedMessage
            id='AddedPhoto.numberofphotos'
            defaultMessage={`You've added a total of {count} {photos}.`}
            values={{
              count: (
                <b>
                  <FormattedNumber
                    value={numberOfPhotos}
                  />
                </b>
              ),
              photos: (
                <FormattedPlural
                  value={numberOfPhotos}
                  one={
                    <FormattedMessage
                      id='AddedPhoto.photo'
                      defaultMessage='photo'
                    />
                  }
                  other={
                    <FormattedMessage
                      id='AddedPhoto.photos'
                      defaultMessage='photos'
                    />
                  }
                />
              ),
            }}
          />
        </Typography>
        <Typography variant="body1" gutterBottom>
          <FormattedMessage
            id="AddedPhoto.p1"
            defaultMessage="Click on 'ANOTHER PHOTO' to take another photo."
          />
        </Typography>
        <div className={classes.centerContainer}>
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
        <div className={classes.centerContainer}>
          <Button
            color='secondary'
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
