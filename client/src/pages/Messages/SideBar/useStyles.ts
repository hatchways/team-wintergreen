import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
    paddingTop: 20,
    borderBottom: '1px solid grey',
    marginTop: 8,
  },
  title: {
    fontSize: '40',
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 15,
  },
  rootChat: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  Details: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
  },
  profilePic: {
    height: 44,
    width: 44,
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: '#D0DAE9',
  },
  sidebar: {
    marginLeft: 17,
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
}));

export default useStyles;
