import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import {FormattedMessage} from 'react-intl';
import MarkdownElement from "@material-ui/docs/MarkdownElement";


const styles = () => ({
  p: {
    paddingBottom: '1em'
  }
});

const contentKeys = ['dataprivacy', 'imprint', 'openschufa', 'faq', 'privacyagreement'];

class Modal extends Component {

  static propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
  };

  state = {
    dataprivacy: <div/>,
    imprint: <div/>,
    openschufa: <div/>
  };

  componentDidMount () {
    const { currentLanguage } = this.props;
    contentKeys.forEach(key => {
      fetch(`content/${currentLanguage}.${key}.md`)
        .then(response => response.text())
        .then(text => {
          this.setState({[key]: <MarkdownElement text={text}/>})
        });
    });
  }

  render() {

    const {id, fullScreen, open, handleClose} = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          {this.state[id]}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            <FormattedMessage
              id="Modal.dialogclose"
              defaultMessage="Close"
            />
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(withMobileDialog()(Modal));
