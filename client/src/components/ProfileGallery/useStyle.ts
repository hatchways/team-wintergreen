import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  image: {
    width: '100px',
    height: '100px',

    '& img': {
      width: '100%',
    },
  },
}));
