import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

class Tip extends Component {
  render() {
    const { style, bullet, children } = this.props;
    return (
      <div style={style}>
        <Typography variant="title" gutterBottom>
          {bullet}
        </Typography>
        <div
          style={{
            position: 'relative',
            left: 30,
            bottom: 30,
            marginRight: 30,
          }}
        >
          <Typography variant="body1" gutterBottom>
            {children}
          </Typography>
        </div>
      </div>
    );
  }
}

export default Tip;
