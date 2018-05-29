import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormattedMessage } from 'react-intl';
import logo from '../../images/logo.png';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './LandingPage.css';
import { STEP_USAGE } from '../../constants';

const inlineStyles = theme => ({
  header: {
    height: '4em',
    backgroundImage: `url(${logo})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    marginBottom: '1rem',
    width: '100%',
  },
  item: {
    width: '100%',
    textAlign: 'center',
  },
  secondToLastItem: {
    flex: '1 1 auto',
  },
  lastItem: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  languageContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  languageMenuList: {
    width: '3rem',
    paddingTop: 0,
  },
  languageMenuItem: {
    textAlign: 'end',
    paddingTop: 0,
    paddingBottom: 6,
    paddingRight: 0,
    display: 'block',
    fontSize: '1rem',
    lineHeight: '1rem',
    height: 'UNSET',
  },
  button: {
    width: '10rem',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  leftButton: {
    paddingLeft: 0,
  },
  rightButton: {
    paddingRight: 0,
  },
  callToAction: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5rem',
    backgroundColor: theme.palette.primary.main,
    marginBottom: 10,
  },
  callToActionTitle: {
    fontSize: '1.2rem',
  },
});

/*
const languages = [
  {locale: 'de', name: 'DE'},
  {locale: 'en', name: 'EN'},
];
*/

class Index extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    router: PropTypes.object,
  };

  componentDidMount() {
    this.props.resetForm();
  }

  handleModalOpen = id => {
    const { openModal } = this.props;
    openModal(id);
  };

  handleLanguageClick = language => {
    const { switchLanguage } = this.props;
    switchLanguage(language);
  };

  handleUploadClick = () => {
    const { setActiveStep, resetForm, resetFinished } = this.props;
    setActiveStep(STEP_USAGE);
    resetForm();
    resetFinished();
  };

  render() {
    // const {classes, currentLanguage} = this.props;
    const { classes } = this.props;

    return (
      <div className={styles.root}>
        <div className={classes.header}>
          {/*<div className={classes.languageContainer}>
              <MenuList className={classes.languageMenuList}>
                {
                  languages
                    .filter(lang => lang.locale !== currentLanguage)
                    .map((lang, i) => {
                      return (
                        <MenuItem
                          key={i}
                          className={classes.languageMenuItem}
                          value={lang.locale}
                          onClick={() => this.handleLanguageClick(lang.locale)}
                        >
                          {lang.name}
                        </MenuItem>
                      );
                    })
                }
              </MenuList>
          </div>*/}
        </div>
        <div className={classes.callToAction} style={{ marginBottom: '2rem' }}>
          <Typography
            className={classes.callToActionTitle}
            variant="title"
            noWrap={true}
          >
            <span style={{ color: 'white' }}>
              <FormattedMessage
                id="LandingPage.calltoaction"
                defaultMessage="Help us to crack the SCHUFA!"
              />
            </span>
          </Typography>
        </div>
        <div className={classes.item} style={{ marginBottom: '2rem' }}>
          <Typography variant="subheading" gutterBottom>
            <FormattedMessage
              id="LandingPage.welcome"
              defaultMessage="Welcome to OpenSCHUFA!"
            />
          </Typography>
        </div>
        <div className={classes.item} style={{ marginBottom: '2rem' }}>
          <Link to="/steps" style={{ textDecoration: 'none' }}>
            <Button
              color="primary"
              variant="raised"
              className={classes.button}
              onClick={this.handleUploadClick}
            >
              <span
                style={{
                  color: 'white',
                  textTransform: 'none',
                }}
              >
                <FormattedMessage
                  id="LandingPage.upload.buttontext"
                  defaultMessage="Upload"
                />
              </span>
            </Button>
          </Link>
        </div>
        <div className={classes.item} style={{ marginBottom: '2rem' }}>
          <Button
            color="default"
            variant="raised"
            className={classes.button}
            href="https://selbstauskunft.net/schufa/"
            target="_blank"
          >
            <span style={{ textTransform: 'none' }}>
              <FormattedMessage
                id="LandingPage.requestinfo.buttontext"
                defaultMessage="Apply"
              />
            </span>
          </Button>
        </div>
        <div
          className={classNames(classes.item)}
          style={{ marginBottom: '2rem' }}
        >
          <Button
            color="default"
            variant="raised"
            className={classes.button}
            onClick={() => this.handleModalOpen('openschufa')}
          >
            <span style={{ textTransform: 'none' }}>
              <FormattedMessage
                id="LandingPage.openschufa.buttontext"
                defaultMessage="Get information"
              />
            </span>
          </Button>
        </div>
        <div
          className={classNames(classes.item, classes.secondToLastItem)}
          style={{ marginBottom: '2rem' }}
        >
          <Button
            color="default"
            variant="raised"
            className={classes.button}
            onClick={() => this.handleModalOpen('faq')}
          >
            <span style={{ textTransform: 'none' }}>
              <FormattedMessage
                id="LandingPage.faq.buttontext"
                defaultMessage="FAQ"
              />
            </span>
          </Button>
        </div>
        <div className={classes.lastItem}>
          <Button
            className={classes.leftButton}
            size="small"
            onClick={() => this.handleModalOpen('imprint')}
          >
            <FormattedMessage
              id="LandingPage.impressum"
              defaultMessage="Imprint"
            />
          </Button>
          <Button
            className={classes.rightButton}
            size="small"
            onClick={() => this.handleModalOpen('dataprivacy')}
          >
            <FormattedMessage
              id="LandingPage.dataprivacy"
              defaultMessage="Data privacy statement"
            />
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(inlineStyles)(Index);
