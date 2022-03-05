import React from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import useStyles from './useStyles';

const Chat = (conversation: any) => {
  const classes = useStyles();
  return (
    <Box className={classes.rootChat}>
      <Box className={classes.sidebar}>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <Avatar src={conversation.message.photo} className={classes.profilePic}></Avatar>
        </Badge>
      </Box>
      <Box className={classes.Details}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} className={classes.username}>
            {conversation.message.name}
          </Typography>
          <Typography style={{ float: 'left' }} className={classes.previewText}>
            {conversation.message.latestMessage}
          </Typography>

          <Typography style={{ marginLeft: '15vw' }}>
            {' '}
            {moment().format('YYYY-MM-DD') === moment(conversation.message.createAt).format('YYYY-MM-DD')
              ? 'Today'
              : moment(conversation.message.createAt).format('YYYY-MM-DD')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
