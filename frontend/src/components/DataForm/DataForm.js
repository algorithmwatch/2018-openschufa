import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import format from 'date-fns/format';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import { FormLabel, FormControl, FormGroup } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu/index';

import enLocale from 'date-fns/locale/en-US';
import deLocale from 'date-fns/locale/de';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ProgressBar from '../ProgressBar';

const localeMap = {
  en: enLocale,
  de: deLocale,
};

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, 'D MMM YYYY', { locale: this.locale });
  }
}

const messages = defineMessages({
  plz: {
    id: 'DataForm.plz',
    defaultMessage: 'Postal code',
  },
  yearOfBirth: {
    id: 'DataForm.yearofbirth',
    defaultMessage: 'Year of birth',
  },
  sex: {
    id: 'DataForm.sex',
    defaultMessage: 'Sex',
  },
  male: {
    id: 'DataForm.male',
    defaultMessage: 'Male',
  },
  female: {
    id: 'DataForm.female',
    defaultMessage: 'Female',
  },
  nonBinary: {
    id: 'DataForm.nonbinary',
    defaultMessage: 'Non-binary',
  },
  notSpecified: {
    id: 'DataForm.notspecified',
    defaultMessage: 'Not specified',
  },
  familyStatus: {
    id: 'DataForm.familystatus',
    defaultMessage: 'Family status',
  },
  married: {
    id: 'DataForm.married',
    defaultMessage: 'Married / Civil partners',
  },
  divorced: {
    id: 'DataForm.divorced',
    defaultMessage: 'Divorced',
  },
  singleParent: {
    id: 'DataForm.singleparent',
    defaultMessage: 'Single parent',
  },
  single: {
    id: 'DataForm.single',
    defaultMessage: 'Single',
  },
  nationality: {
    id: 'DataForm.nationality',
    defaultMessage: 'Nationality',
  },
  yes: {
    id: 'DataForm.yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'DataForm.no',
    defaultMessage: 'No',
  },
  migrationBackground: {
    id: 'DataForm.migrationbackground',
    defaultMessage: 'Migration background',
  },
  numberOfChildren: {
    id: 'DataForm.numberOfChildren',
    defaultMessage: 'Number of children entitled to child allowance',
  },
  freelance: {
    id: 'DataForm.freelance',
    defaultMessage: 'Freelance',
  },
  employed: {
    id: 'DataForm.employed',
    defaultMessage: 'Employed',
  },
  official: {
    id: 'DataForm.official',
    defaultMessage: 'Official',
  },
  seekingWork: {
    id: 'DataForm.seekingwork',
    defaultMessage: 'Seeking work',
  },
  retired: {
    id: 'DataForm.retired',
    defaultMessage: 'Retired',
  },
  student: {
    id: 'DataForm.student',
    defaultMessage: 'Student',
  },
  employment: {
    id: 'DataForm.employment',
    defaultMessage: 'Employment',
  },
  monthlyIncome: {
    id: 'DataForm.monthlyincome',
    defaultMessage: 'Monthly income (pre-tax)',
  },
  moreThan5000: {
    id: 'DataForm.morethan5000',
    defaultMessage: 'More than 5000 €',
  },
  formHousing: {
    id: 'DataForm.housing',
    defaultMessage: 'Housing',
  },
  sharedFlat: {
    id: 'DataForm.sharedflat',
    defaultMessage: 'Shared flat',
  },
  flat: {
    id: 'DataForm.flat',
    defaultMessage: 'Flat',
  },
  freeholdFlat: {
    id: 'DataForm.freeholdflat',
    defaultMessage: 'Freehold flat',
  },
  relocations: {
    id: 'DataForm.relocations',
    defaultMessage: 'Number of relocations within last 10 years',
  },
  more: {
    id: 'DataForm.more',
    defaultMessage: 'More',
  },
  number: {
    id: 'DataForm.number',
    defaultMessage: 'Number',
  },
  loanAmount: {
    id: 'DataForm.loanamount',
    defaultMessage: 'Loan amount',
  },
  numberOfMobileContracts: {
    id: 'DataForm.numberofmobilecontracts',
    defaultMessage: 'Number of mobile contracts',
  },
  numberOfGiroAccounts: {
    id: 'DataForm.numberofgiroaccounts',
    defaultMessage: 'Number of giro accounts',
  },
  numberOfCreditCards: {
    id: 'DataForm.numberofcreditcards',
    defaultMessage: 'Number of credit cards',
  },
  mailOrder: {
    id: 'DataForm.mailorder',
    defaultMessage: 'Do you have mail order accounts like Amazon or Zalando?',
  },
  admonition: {
    id: 'DataForm.admonitions',
    defaultMessage: 'Admonitions',
  },
  cashing: {
    id: 'DataForm.cashing',
    defaultMessage: 'Pending collection orders',
  },
  executionProceedings: {
    id: 'DataForm.executionproceedings',
    defaultMessage: 'Execution proceedings',
  },
  insolvencyProceedings: {
    id: 'DataForm.insolvencyproceedings',
    defaultMessage: 'Insolvency proceedings',
  },
  formDate: {
    id: 'DataForm.date',
    defaultMessage: 'Date of SCHUFA-information',
  },
});

const inlineStyles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 270,
  },
  divContainer: {
    marginLeft: 8,
    marginTop: 16,
    width: 270,
  },
  checkboxLabel: {
    fontSize: '0.75rem',
  },
  subHeading: {
    marginTop: 20,
  },
});

class DataForm extends Component {
  static propTypes = {
    classes: PropTypes.object,
    theme: PropTypes.object,
    intl: PropTypes.object,
    language: PropTypes.string,
  };

  state = {
    open: false,
    message: '',
  };

  handleChange = name => event => {
    const value = event.target.value;
    if (name === 'plz' && value >= 99999) {
      this.setState({
        open: true,
        message: (
          <FormattedMessage
            id="DataForm.validationerror.plz"
            defaultMessage="Please enter at most 5 numbers!"
          />
        ),
      });
      return;
    }
    if (name === 'nationality') {
      if (value.length > 30) {
        this.setState({
          open: true,
          message: (
            <FormattedMessage
              id="DataForm.validationerror.nationalitylength"
              defaultMessage="Please enter at most 30 characters!"
            />
          ),
        });
        return;
      }
      if (value.length && !/^[a-z -]+$/i.test(value)) {
        this.setState({
          open: true,
          message: (
            <FormattedMessage
              id="DataForm.validationerror.nationality"
              defaultMessage="Please enter only letters or hyphens!"
            />
          ),
        });
        return;
      }
    }
    if (name === 'numberOfChildren' && (value >= 20 || value < 0)) {
      this.setState({
        open: true,
        message: (
          <FormattedMessage
            id="DataForm.validationerror.numberOfChildren"
            defaultMessage="Please enter a number between 0 and 20!"
          />
        ),
      });
      return;
    }
    this.props.handleChange(name, value);
  };

  handleCheckboxChange = name => event => {
    this.props.handleChange(name, event.target.checked);
  };

  handleDateChange = date => {
    this.props.handleChange('schufaDate', date);
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, language } = this.props;
    const { formatMessage } = this.props.intl;
    const locale = localeMap[language];
    const {
      plz,
      yearOfBirth,
      sex,
      familyStatus,
      nationality,
      migrationBackground,
      numberOfChildren,
      employment,
      monthlyIncome,
      housing,
      relocation,
      numberOfActiveLoans,
      activeLoanAmount,
      numberOfPaidOffLoans,
      paidOffLoanAmount,
      numberOfMobileContracts,
      numberOfGiroAccounts,
      numberOfCreditCards,
      mailOrder,
      admonition,
      cashing,
      executionProceedings,
      insolvencyProceedings,
      schufaDate,
    } = this.props.surveyData;

    const sexes = [
      {
        value: 'male',
        label: formatMessage(messages.male),
      },
      {
        value: 'female',
        label: formatMessage(messages.female),
      },
      {
        value: 'non-binary',
        label: formatMessage(messages.nonBinary),
      },
      {
        value: 'not-specified',
        label: formatMessage(messages.notSpecified),
      },
    ];

    const familyStatuses = [
      {
        value: 'married',
        label: formatMessage(messages.married),
      },
      {
        value: 'divorced',
        label: formatMessage(messages.divorced),
      },
      {
        value: 'single',
        label: formatMessage(messages.single),
      },
      {
        value: 'single-parent',
        label: formatMessage(messages.singleParent),
      },
      {
        value: 'not-specified',
        label: formatMessage(messages.notSpecified),
      },
    ];

    const yesno = [
      {
        value: 1,
        label: formatMessage(messages.yes),
      },
      {
        value: 0,
        label: formatMessage(messages.no),
      },
    ];

    const employments = [
      {
        value: 'freelance',
        label: formatMessage(messages.freelance),
      },
      {
        value: 'employed',
        label: formatMessage(messages.employed),
      },
      {
        value: 'official',
        label: formatMessage(messages.official),
      },
      {
        value: 'seeking-work',
        label: formatMessage(messages.seekingWork),
      },
      {
        value: 'retired',
        label: formatMessage(messages.retired),
      },
      {
        value: 'student',
        label: formatMessage(messages.student),
      },
      {
        value: 'not-specified',
        label: formatMessage(messages.notSpecified),
      },
    ];

    const amounts = [
      {
        value: 500,
        label: '500-1000 €',
      },
      {
        value: 1000,
        label: '1000-2000 €',
      },
      {
        value: 2000,
        label: '2000-3000 €',
      },
      {
        value: 3000,
        label: '3000-4000 €',
      },
      {
        value: 4000,
        label: '4000-5000 €',
      },
      {
        value: 5000,
        label: formatMessage(messages.moreThan5000),
      },
      {
        value: 0,
        label: formatMessage(messages.notSpecified),
      },
    ];

    const housings = [
      {
        value: 'shared-flat',
        label: formatMessage(messages.sharedFlat),
      },
      {
        value: 'flat',
        label: formatMessage(messages.flat),
      },
      {
        value: 'freehold-flat',
        label: formatMessage(messages.freeholdFlat),
      },
      {
        value: 'not-specified',
        label: formatMessage(messages.notSpecified),
      },
    ];

    const numbers = [
      {
        value: 'not-specified',
        label: formatMessage(messages.notSpecified),
      },
      {
        value: 0,
        label: '0',
      },
      {
        value: 1,
        label: 1,
      },
      {
        value: 2,
        label: 2,
      },
      {
        value: 3,
        label: 3,
      },
      {
        value: 4,
        label: 4,
      },
      {
        value: 5,
        label: 5,
      },
      {
        value: 6,
        label: formatMessage(messages.more),
      },
    ];

    const years = [];
    for (let i = 1900; i <= 2018; i++)
      years.push({
        value: i,
        label: i,
      });
    years.push({
      value: 'not-specified',
      label: formatMessage(messages.notSpecified),
    });

    return (
      <div style={{ marginTop: 6 }}>
        <Paper className={classes.root} elevation={0}>
          <ProgressBar stepsFinished={2} />
          <Typography variant="title" gutterBottom>
            <FormattedMessage
              id="DataForm.header"
              defaultMessage="A few data more..."
            />
          </Typography>
          <Typography variant="body1" gutterBottom>
            <FormattedMessage
              id="DataForm.p1"
              defaultMessage="The following are some questions that you are kindly asked to answer ... "
            />
          </Typography>
          <form className={classes.formContainer} noValidate autoComplete="off">
            <MuiPickersUtilsProvider utils={LocalizedUtils} locale={locale}>
              <div className="picker">
                <DatePicker
                  className={classes.textField}
                  label={formatMessage(messages.formDate)}
                  format="D MMM YYYY"
                  value={schufaDate}
                  onChange={this.handleDateChange}
                  animateYearScrolling={false}
                  leftArrowIcon={<KeyboardArrowLeft />}
                  rightArrowIcon={<KeyboardArrowRight />}
                />
              </div>
            </MuiPickersUtilsProvider>
            <Typography
              variant="subheading"
              className={classes.subHeading}
              gutterBottom
            >
              <FormattedMessage
                id="DataForm.sociodemography"
                defaultMessage="Socio-demography"
              />
            </Typography>
            <TextField
              id="plz"
              label={formatMessage(messages.plz)}
              value={plz}
              onChange={this.handleChange('plz')}
              type="number"
              inputProps={{ min: 0, max: 10 }}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="yearOfBirth"
              select
              label={formatMessage(messages.yearOfBirth)}
              className={classes.textField}
              value={yearOfBirth}
              onChange={this.handleChange('yearOfBirth')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {years.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="sex"
              select
              label={formatMessage(messages.sex)}
              className={classes.textField}
              value={sex}
              onChange={this.handleChange('sex')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {sexes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="migrationBackground"
              select
              label={formatMessage(messages.migrationBackground)}
              className={classes.textField}
              value={migrationBackground}
              onChange={this.handleChange('migrationBackground')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {yesno.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="nationality"
              label={formatMessage(messages.nationality)}
              className={classes.textField}
              value={nationality}
              onChange={this.handleChange('nationality')}
              margin="normal"
            />
            <TextField
              id="familyStatus"
              select
              label={formatMessage(messages.familyStatus)}
              className={classes.textField}
              value={familyStatus}
              onChange={this.handleChange('familyStatus')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {familyStatuses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="numberOfChildren"
              label={formatMessage(messages.numberOfChildren)}
              value={numberOfChildren}
              onChange={this.handleChange('numberOfChildren')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              id="employment"
              select
              label={formatMessage(messages.employment)}
              className={classes.textField}
              value={employment}
              onChange={this.handleChange('employment')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {employments.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="monthlyIncome"
              select
              label={formatMessage(messages.monthlyIncome)}
              className={classes.textField}
              value={monthlyIncome}
              onChange={this.handleChange('monthlyIncome')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {amounts.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="housing"
              select
              label={formatMessage(messages.formHousing)}
              className={classes.textField}
              value={housing}
              onChange={this.handleChange('housing')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {housings.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="relocation"
              select
              label={formatMessage(messages.relocations)}
              className={classes.textField}
              value={relocation}
              onChange={this.handleChange('relocation')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {numbers.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="subheading"
              className={classes.subHeading}
              gutterBottom
            >
              <FormattedMessage
                id="DataForm.financialsituation"
                defaultMessage="Financial situation"
              />
            </Typography>
            <FormControl component="fieldset" className={classes.divContainer}>
              <FormLabel component="legend" className={classes.checkboxLabel}>
                <FormattedMessage
                  id="DataForm.activeloans"
                  defaultMessage="Active Loans / Mortgages / Lease contracts / instalment payments"
                />
              </FormLabel>
              <FormGroup>
                <TextField
                  id="numberOfActiveLoans"
                  select
                  label={formatMessage(messages.number)}
                  className={classes.textField}
                  value={numberOfActiveLoans}
                  onChange={this.handleChange('numberOfActiveLoans')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {numbers.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="activeLoanAmount"
                  select
                  label={formatMessage(messages.loanAmount)}
                  className={classes.textField}
                  value={activeLoanAmount}
                  onChange={this.handleChange('activeLoanAmount')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {amounts.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" className={classes.divContainer}>
              <FormLabel component="legend" className={classes.checkboxLabel}>
                <FormattedMessage
                  id="DataForm.paidoffloans"
                  defaultMessage="Paid off Loans / Mortgages / Lease contracts / instalment payments"
                />
              </FormLabel>
              <FormGroup>
                <TextField
                  id="numberOfPaidOffLoans"
                  select
                  label={formatMessage(messages.number)}
                  className={classes.textField}
                  value={numberOfPaidOffLoans}
                  onChange={this.handleChange('numberOfPaidOffLoans')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {numbers.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="paidOffLoanAmount"
                  select
                  label={formatMessage(messages.loanAmount)}
                  className={classes.textField}
                  value={paidOffLoanAmount}
                  onChange={this.handleChange('paidOffLoanAmount')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {amounts.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormGroup>
            </FormControl>
            <TextField
              id="numberOfMobileContracts"
              select
              label={formatMessage(messages.numberOfMobileContracts)}
              className={classes.textField}
              value={numberOfMobileContracts}
              onChange={this.handleChange('numberOfMobileContracts')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {numbers.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="numberOfGiroAccounts"
              select
              label={formatMessage(messages.numberOfGiroAccounts)}
              className={classes.textField}
              value={numberOfGiroAccounts}
              onChange={this.handleChange('numberOfGiroAccounts')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {numbers.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="numberOfCreditCards"
              select
              label={formatMessage(messages.numberOfCreditCards)}
              className={classes.textField}
              value={numberOfCreditCards}
              onChange={this.handleChange('numberOfCreditCards')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {numbers.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="subheading"
              className={classes.subHeading}
              gutterBottom
            >
              <FormattedMessage
                id="DataForm.ecommerce"
                defaultMessage="E-Commerce"
              />
            </Typography>
            <TextField
              id="mailOrder"
              select
              label={formatMessage(messages.mailOrder)}
              className={classes.textField}
              value={mailOrder}
              onChange={this.handleChange('mailOrder')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {yesno.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="subheading"
              className={classes.subHeading}
              gutterBottom
            >
              <FormattedMessage
                id="DataForm.negativeindicators"
                defaultMessage="Negative Indicators"
              />
            </Typography>
            <TextField
              id="admonition"
              select
              label={formatMessage(messages.admonition)}
              className={classes.textField}
              value={admonition}
              onChange={this.handleChange('admonition')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {yesno.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="cashing"
              select
              label={formatMessage(messages.cashing)}
              className={classes.textField}
              value={cashing}
              onChange={this.handleChange('cashing')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {yesno.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="subheading"
              className={classes.subHeading}
              gutterBottom
            >
              <FormattedMessage
                id="DataForm.hardfacts"
                defaultMessage="Hard facts"
              />
            </Typography>
            <TextField
              id="executionProceedings"
              select
              label={formatMessage(messages.executionProceedings)}
              className={classes.textField}
              value={executionProceedings}
              onChange={this.handleChange('executionProceedings')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {yesno.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="insolvencyProceedings"
              select
              label={formatMessage(messages.insolvencyProceedings)}
              className={classes.textField}
              value={insolvencyProceedings}
              onChange={this.handleChange('insolvencyProceedings')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {yesno.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          message={this.state.message}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(inlineStyles, { withTheme: true })(
  injectIntl(DataForm)
);
