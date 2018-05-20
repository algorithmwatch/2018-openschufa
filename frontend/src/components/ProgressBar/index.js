import React, { Fragment } from "react";
import CheckCircleOutline from "@material-ui/icons/CheckCircle";
import Typography from "material-ui/Typography";
import { FormattedMessage, defineMessages } from "react-intl";

const completeStyle = { fill: "#01d538", width: "2rem", height: "2rem" };
const greyedOutStyle = { fill: "grey", width: "2rem", height: "2rem" };

const lineStyle = {
  height: ".2rem",
  width: "100%",
  backgroundColor: "grey",
  marginTop: ".9rem"
};

const labelStyle = {
  position: "absolute",
  top: "2rem",
  left: "-1rem",
  width: "4rem",
  textAlign: "center",
};

const containerStyle = {
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "3rem",
  padding: "0 1rem"
};

// should be part of a config but since the state management is broken beyond
// repair, whatever.  ¯\_(ツ)_/¯
const steps = ["introduction", "upload", "form", "send"];

const messages = defineMessages({
  introduction: {
    id: 'Progressbar.introduction',
    defaultMessage: 'Introduction',
  },
  upload: {
    id: 'Progressbar.upload',
    defaultMessage: 'Upload',
  },
  form: {
    id: 'Progressbar.form',
    defaultMessage: 'Form',
  },
  send: {
    id: 'Progressbar.send',
    defaultMessage: 'Send',
  },
});

const ProgressBar = ({ stepsFinished }) => (
  <div style={containerStyle}>
    {steps.map((step, i) => (
      <Fragment key={i}>
        <div style={{ position: "relative" }}>
          {stepsFinished > i ? (
            <CheckCircleOutline style={completeStyle} />
          ) : (
            <CheckCircleOutline style={greyedOutStyle} />
          )}
          <div style={labelStyle}>
            <Typography variant="body1" gutterBottom>
              <small>
                <FormattedMessage
                  {...messages[step]}
                />
              </small>
            </Typography>
          </div>
        </div>
        {i + 1 < steps.length && <div style={lineStyle} />}
      </Fragment>
    ))}
  </div>
);

export default ProgressBar;
