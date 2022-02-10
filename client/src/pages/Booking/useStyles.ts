import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
    padding: '50px',
    height: 'calc(100% - 106px)',
  },

  paperContainer: {
    padding: '30px',
  },

  label: {
    margin: '15px 0',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  settingButton: {
    width: '1em',
    height: '2em',
    maxWidth: '1em',
  },

  bookingList: {
    height: 'calc(100vh - 450px)',
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px #EAEAEA',
      webkitBoxShadow: 'inset 0 0 6px #EAEAEA',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#A9A9A9',
      borderRadius: '10px',
    },
  },

  calendar: {
    width: '100%',
    minWidth: '245px',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '2em',

    '& button': {
      border: 'none',
      fontFamily: theme.typography.fontFamily,
    },

    '& .react-calendar__navigation': {
      display: 'flex',

      '& button': {
        fontSize: '30px',
        color: 'lightgray',
        background: theme.palette.background.paper,
      },

      '& [class*=prev2-button]': {
        visibility: 'hidden',
      },
      '& [class*=next2-button]': {
        visibility: 'hidden',
      },

      '& [class*=label]': {
        color: theme.palette.primary.main,
        fontSize: '20px',
      },
    },

    '& [class*=weekdays]': {
      display: 'none',
    },

    '& [class*=days]': {
      margin: '10px',
      lineHeight: '2.5em',

      '& [class*=--neighboringMonth]': {
        color: 'lightgray',
      },

      '& button': {
        width: '35px',
        maxWidth: '35px',
        height: '35px',
        margin: '0.5em calc((100% - 245px) / 14)',
      },
    },
  },

  activeDate: {
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: '50%',
  },

  inactiveDate: {
    background: theme.palette.background.paper,
  },
}));
