import React from "react";
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
  <Typography variant="body1" gutterBottom>
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <div>
        {stepsFinished > 0 ? (
          <CheckCircleOutline style={completeStyle}/>
        ) : (
          <CheckCircleOutline style={greyedOutStyle}/>
        )}
      </div>
      <div style={line}/>
      <div>
        {stepsFinished > 1 ? (
          <CheckCircleOutline style={completeStyle}/>
        ) : (
          <CheckCircleOutline style={greyedOutStyle}/>
        )}
      </div>
      <div style={line}/>
      <div>
        {stepsFinished > 2 ? (
          <CheckCircleOutline
            style={completeStyle}
            iconStyle={{fill: "red"}}
          />
        ) : (
          <CheckCircleOutline
            style={greyedOutStyle}
            iconStyle={{fill: "red"}}
          />
        )}
      </div>
      <div style={line}/>
      <div>
        {stepsFinished > 3 ? (
          <CheckCircleOutline style={completeStyle}/>
        ) : (
          <CheckCircleOutline style={greyedOutStyle}/>
        )}
      </div>
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
        <small>
          <FormattedMessage
            id='Progressbar.introduction'
            defaultMessage='Introduction'
          />
        </small>
      </div>
      <div style={{width: "25%", textAlign: "center"}}>
        <small>
          <FormattedMessage
            id='Progressbar.upload'
            defaultMessage='Upload'
          />
        </small>
      </div>
      <div style={{width: "30%", textAlign: "center"}}>
        <small>
          <FormattedMessage
            id='Progressbar.form'
            defaultMessage='Form'
          />
        </small>
      </div>
      <div style={{width: "20%", textAlign: "right"}}>
        <small>
          <FormattedMessage
            id='Progressbar.send'
            defaultMessage='Send'
          />
        </small>
      </div>
    </div>
  </Typography>
);

export default ProgressBar;
