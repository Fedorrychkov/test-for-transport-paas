// @flow
import { BLACK_COLOR, GRAY_COLOR, BLUE_COLOR } from '../../constants/colors';

const styles = (theme: Object) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(2.5),
    color: BLACK_COLOR,
  },
  modal: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
    }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  valignM: {
    display: 'flex',
    alignItems: 'center',
  },
  marginR: {
    marginRight: 12,
  },
  fontMd: {
    fontSize: 14,
  },
  fontSm: {
    fontSize: 12,
  },
  commonText: {
    color: GRAY_COLOR,
  },
  link: {
    color: BLUE_COLOR,
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  controls: {
    width: '100%',
    margin: `${theme.spacing(3)}px 0`,
    display: 'flex',
    justifyContent: 'space-between',
    '&:first-child': {
      marginTop: theme.spacing(4)
    },
    '&:last-child': {
      marginBottom: 0
    }
  },
  input: {
    width: '100%',
    maxWidth: 441,
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px 0 0 4px',
    }
  },
  arrow: {
    color: BLUE_COLOR,
    marginRight: theme.spacing(2),
  },
  select: {
    width: '100%',
    maxWidth: 204,
    '& .MuiOutlinedInput-root': {
      borderRadius: '0 4px 4px 0',
    },
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      color: BLUE_COLOR
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #A3D2FC',
    }
  },
  button: {
    padding: theme.spacing(1),
    '& .MuiButton-label': {
      color: BLUE_COLOR,
    },
    '& .MuiButton-outlinedPrimary': {
      borderColor: BLUE_COLOR
    }
  }
});

export default styles;
