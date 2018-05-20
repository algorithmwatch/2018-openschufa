import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { defineMessages, injectIntl } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from 'material-ui/Button';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';

const styles = () => ({
  logoContainer: {
    flex: 1,
  },
  logoButton: {
    paddingLeft: 0,
    marginBottom: 4,
  },
  menuButton: {
    marginLeft: 20,
    marginRight: -12,
    marginBottom: 4,
  },
  listItem: {
    margin: 0,
  },
});

class MainAppBar extends Component {
  static propTypes = {
    classes: PropTypes.object,
    intl: PropTypes.object,
  };

  state = {
    drawerOpen: false,
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  handleModalOpen = id => () => {
    const { openModal } = this.props;
    openModal(id);
  };

  render() {
    const { classes } = this.props;
    const { formatMessage } = this.props.intl;

    const messages = defineMessages({
      menuAbout: {
        id: 'Menu.about',
        defaultMessage: 'About OpenSCHUFA',
      },
      menuImprint: {
        id: 'Menu.imprint',
        defaultMessage: 'Imprint',
      },
      menuDataPrivacy: {
        id: 'Menu.dataprivacy',
        defaultMessage: 'Data Privacy Statement',
      },
      menuFaq: {
        id: 'Menu.faq',
        defaultMessage: 'FAQ',
      },
      menuPrivacyAgreement: {
        id: 'Menu.privacyagreement',
        defaultMessage: 'Privacy agreement',
      },
    });

    return (
      <div>
        <AppBar color="inherit" position="static">
          <Toolbar>
            <div className={classes.logoContainer}>
              <Link to="/">
                <Button variant="flat" className={classes.logoButton}>
                  <img src={Logo} style={{ height: 40 }} alt="OpenSchufa" />
                </Button>
              </Link>
            </div>
            <IconButton
              className={classes.menuButton}
              color="secondary"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
          disableEnforceFocus={true}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <List component="nav">
              <ListItem
                button
                className={classes.listItem}
                onClick={this.handleModalOpen('openschufa')}
              >
                <ListItemText primary={formatMessage(messages.menuAbout)} />
              </ListItem>
              <ListItem
                button
                className={classes.listItem}
                onClick={this.handleModalOpen('imprint')}
              >
                <ListItemText primary={formatMessage(messages.menuImprint)} />
              </ListItem>
              <ListItem
                button
                className={classes.listItem}
                onClick={this.handleModalOpen('dataprivacy')}
              >
                <ListItemText
                  primary={formatMessage(messages.menuDataPrivacy)}
                />
              </ListItem>
              <ListItem
                button
                className={classes.listItem}
                onClick={this.handleModalOpen('faq')}
              >
                <ListItemText primary={formatMessage(messages.menuFaq)} />
              </ListItem>
              <ListItem
                button
                className={classes.listItem}
                onClick={this.handleModalOpen('privacyagreement')}
              >
                <ListItemText
                  primary={formatMessage(messages.menuPrivacyAgreement)}
                />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(injectIntl(MainAppBar));
