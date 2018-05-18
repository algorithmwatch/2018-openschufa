import React, {Fragment} from "react";
import CheckCircleOutline from "@material-ui/icons/CheckCircle";
import Typography from "material-ui/Typography";
import {FormattedMessage} from 'react-intl';

const completeStyle = {fill: "green", width: "2rem", height: "2rem"};
const greyedOutStyle = {fill: "grey", width: "2rem", height: "2rem"};

const line = {
  height: "0.2rem",
  width: "100%",
  backgroundColor: "grey",
  marginTop: "0.9rem"
};

const ProgressBar = ({stepsFinished}) => (
  <div>
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
    {[0, 1, 2, 3].map(i => (
        <Fragment key={i}>
          <div>
            {stepsFinished > i ? (
              <CheckCircleOutline style={completeStyle}/>
            ) : (
              <CheckCircleOutline style={greyedOutStyle}/>
            )}
          </div>
          {i < 3 &&
            <div style={line}/>
          }
        </Fragment>
      ))}
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "2rem",
        flexGrow: "0"
      }}
    >
      <div style={{width: "20%"}}>
        <Typography variant='body1' gutterBottom>
          <small>
            <FormattedMessage
              id='Progressbar.introduction'
              defaultMessage='Introduction'
            />
          </small>
        </Typography>
      </div>
      <div style={{width: "25%", textAlign: "center"}}>
        <Typography variant='body1' gutterBottom>
          <small>
            <FormattedMessage
              id='Progressbar.upload'
              defaultMessage='Upload'
            />
          </small>
        </Typography>
      </div>
      <div style={{width: "30%", textAlign: "center"}}>
        <Typography variant='body1' gutterBottom>
          <small>
            <FormattedMessage
              id='Progressbar.form'
              defaultMessage='Form'
            />
          </small>
        </Typography>
      </div>
      <div style={{width: "20%", textAlign: "right"}}>
        <Typography variant='body1' gutterBottom>
          <small>
            <FormattedMessage
              id='Progressbar.send'
              defaultMessage='Send'
            />
          </small>
        </Typography>
      </div>
    </div>
  </div>
);

export default ProgressBar;
