import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, FilledInput, FormControl, Typography } from '@mui/material';
import moment from 'moment';
const useStyles = makeStyles(() => ({
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
  },
}));

const Chat = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <>
        <Box className={classes.root}>
          <Box className={classes.content}>
            <Typography className={classes.username}>Amita</Typography>
            <Box className={`${classes.statusDot} ${classes['online']}`}></Box>
            <Typography className={classes.statusText}>{true ? 'Online' : 'Offline'}</Typography>
          </Box>
        </Box>
        <Box className={classes.chatContainer}>
          <Box>
            {['hi,hello,whereareyou'].map((message) => {
              const time = moment('12/12/32').format('h:mm');

              return 10 === 10 ? (
                <Box className={classes.root}>
                  <Typography className={classes.date}>10:10</Typography>
                  <Box className={classes.bubble}>
                    <Typography className={classes.text}>{message}</Typography>
                  </Box>
                </Box>
              ) : (
                <Box className={classes.root}>
                  <Avatar className={classes.avatar}></Avatar>
                  <Box>
                    <Typography className={classes.usernameDate}>10:00</Typography>
                    <Box className={classes.bubbleOther}>
                      <Typography className={classes.textOther}>{message}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <form className={classes.root}>
            <FormControl fullWidth hiddenLabel>
              <FilledInput
                classes={{ root: classes.input }}
                disableUnderline
                placeholder="Type something..."
                value="hello"
                name="text"
              />
            </FormControl>
          </form>
        </Box>
      </>
    </Box>
  );
};

export default Chat;
