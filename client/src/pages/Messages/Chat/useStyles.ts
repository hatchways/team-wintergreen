import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  root1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 89,
    marginBottom: 34,
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
  },
  root2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  root3: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
  },
  username: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginRight: 14,
  },
  statusText: {
    fontSize: 12,
    color: '#BFC9DB',
    letterSpacing: -0.17,
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    marginRight: 5,
    backgroundColor: '#D0DAE9',
  },
  online: {
    background: '#1CED84',
  },
  ellipsis: {
    color: '#95A7C4',
    marginRight: 24,
    opacity: 0.5,
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#91A3C0',
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: 'bold',
  },
  bubble: {
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bubbleOther: {
    backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: '0 10px 10px 10px',
  },
  textOther: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    padding: 8,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 5,
  },
  profilePic: {
    height: 44,
    width: 44,
  },
  submit: {
    margin: theme.spacing(5, 8, 2),
    width: 100,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sendIcon: {
    marginLeft: 1,
  },
  box: {
    marginTop: 3,
  },
}));

export default useStyles;
