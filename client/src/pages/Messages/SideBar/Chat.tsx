import React from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
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
  root1: {
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

const Chat = (conversation: any) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.sidebar}>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <Avatar src={conversation.message.photo} className={classes.profilePic}></Avatar>
        </Badge>
      </Box>
      <Box className={classes.root1}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} className={classes.username}>
            {conversation.message.name}
          </Typography>
          <Typography style={{ float: 'left' }} className={classes.previewText}>
            {conversation.message.latestMessage}
          </Typography>

          <Typography style={{ marginLeft: '15vw' }}>
            {' '}
            {moment(conversation.message.createAt).format('YYYY-MM-DD')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
