import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import photo from '../../images/how_to_take_photo.jpg';
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
  link: {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline',
  },
});

class Usage extends Component {
  handleClick = e => {
    this.props.openModal('privacyagreement');
    e.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ marginTop: 6 }}>
        <Paper className={classes.root} elevation={0}>
          <ProgressBar stepsFinished={0} />
          <Typography variant="title" gutterBottom>
            <FormattedMessage id="Usage.header" defaultMessage="Introduction" />
          </Typography>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage
              id="Usage.p1"
              defaultMessage="{link} can you have a look at the privacy agreement..."
              values={{
                link: (
                  <span className={classes.link} onClick={this.handleClick}>
                    <FormattedMessage
                      id="Usage.linktoprivacyagreement"
                      defaultMessage="Here"
                    />
                  </span>
                ),
              }}
            />
          </Typography>
          <br />
          <br />
          <Typography variant="title" gutterBottom>
            <small>
              <FormattedMessage
                id="Usage.whatpagesweneed"
                defaultMessage="Introduction"
              />
            </small>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage
              id="Usage.p2"
              defaultMessage="If you now take fotos of your SCHUFA information ..."
            />
          </Typography>
          <br />
          <img src={photo} alt="" className={classes.image} />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Usage);
