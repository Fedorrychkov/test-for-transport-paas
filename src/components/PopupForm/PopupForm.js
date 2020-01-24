// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MuiMenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import CachedIcon from '@material-ui/icons/Cached';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { BLACK_COLOR, BLUE_COLOR } from '../../constants/colors';
import styles from './styles';
import { valueTypes } from '../../constants/types';
import { valueMatching, getParsedValues } from '../../helpers/valueMatching';

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    borderBottom: 0,
    color: BLACK_COLOR,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
}))(MuiDialogActions);

const MenuItem = withStyles(theme => ({
  root: {
    color: BLUE_COLOR
  },
}))(MuiMenuItem);

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5" className={[classes.valignM, classes.fontMd].join(' ')}>
        <GetAppIcon className={classes.marginR} />
        {children}
      </Typography>
      {onClose && (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

const CommonTextBlock = withStyles(styles)(props => {
  const { children, classes } = props;
  return (
    <>
      {children && (
        <div className={classes.commonBlock}>{children}</div> 
      )}
    </>
  );
});

const PopupForm = withStyles(styles)(props => {
  const { isOpen, onClose, popupTitle, classes, fields, values, setValues, onSave } = props;
  
  const matchingValues = valueMatching({ fields, values });
  
  const handleSave = () => {
    onClose();
    onSave();
  };

  const handleChange = (index, key) => {
    const hasType = matchingValues.find(item => item.key === key);

    if (hasType) return false;

    const newValues = matchingValues.map((item, i) => {
      if (index === i) {
        return { ...item, key }
      }

      return item
    })

    const parsed = getParsedValues(newValues);
    setValues(parsed);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className={classes.modal}>
      <DialogTitle onClose={onClose}>
        {popupTitle}
      </DialogTitle>
      <DialogContent dividers>
        <CommonTextBlock>
          <Typography variant="h6" gutterBottom className={classes.fontMd}>
            Fields from uploaded CSV file
          </Typography>
          <Typography gutterBottom className={[classes.fontSm, classes.commonText].join(' ')}>
            Please choose correct columns and click
            <strong> Show Table Preview </strong>
            to see your imported data.
            <br />
            <Link className={classes.link}>Send us your base file</Link> and we'll import it ourselves if you have any problems with that.
          </Typography>
        </CommonTextBlock>
        <div>
          {matchingValues && matchingValues.map((item, index) => (
            <div key={index} className={classes.controls}>
              <TextField
                label={`Field ${index}`}
                className={classes.input}
                variant="outlined"
                disabled
                value={item.text}
              />
              <FormControl variant="outlined" className={classes.select}>
                <Select
                  IconComponent={() => <ExpandMoreIcon className={classes.arrow} />}
                  value={item.key || ''}
                  displayEmpty
                  onChange={(event) => handleChange(index, event.target.value)}
                >
                  <MenuItem value="" disabled>Select value</MenuItem>
                  {valueTypes && valueTypes.map((type, i) => (
                    <MenuItem key={index + i} value={type.value}>{type.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ))}
        </div>
      </DialogContent>
      
      <DialogActions>
        <Button fullWidth variant="outlined" onClick={handleSave} color="primary" className={classes.button}>
          <CachedIcon className={classes.marginR} /> Show Table Preview
        </Button>
      </DialogActions>
    </Dialog>
  );
});

PopupForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fields: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  setValues: PropTypes.func.isRequired,
  popupTitle: PropTypes.string,
  classes: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

PopupForm.defaultProps = {
  popupTitle: 'Untitled',
  classes: {},
  onSave: () => {},
  onClose: () => {},
};

export default PopupForm;
