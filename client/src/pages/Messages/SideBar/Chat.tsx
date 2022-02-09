import React from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
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
  online: {
    backgroundColor: '#1CED84',
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

const Chat = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.sidebar}>
        <Badge
          classes={{ badge: `${classes.badge} ${classes.online}` }}
          variant="dot"
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          overlap="circular"
        >
          <Avatar className={classes.profilePic}></Avatar>
        </Badge>
      </Box>
      <Box className={classes.root}>
        <Box>
          <Typography className={classes.username}>Hello</Typography>
          <Typography className={classes.previewText}>How are you</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
