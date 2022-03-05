import React, { useState } from 'react';
import { Avatar, Box, Button, FilledInput, FormControl, Typography } from '@mui/material';
import moment from 'moment';
import { Badge } from '@mui/material';
import createNewMessage from '../../../helpers/APICalls/createNewMessage';
import useStyles from './useStyles';
import SendIcon from '@mui/icons-material/Send';

const Chat = (conversation: any) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    const data = {
      text,
      conversationId: conversation.conversationId as string,
    };
    createNewMessage(data).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
      } else if (data.success) {
        const conversationData = {
          conversationId: conversation.conversationId,
        };
        conversation.setNewMessage(true);
        conversation.fillMessageDetails(conversation.conversationId);
        setText('');
      }
    });
  };
  return (
    <Box className={classes.root}>
      <>
        <Box className={classes.root1}>
          <Box className={classes.content}>
            <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <Avatar src={conversation.message.photo} className={classes.profilePic}></Avatar>
            </Badge>
            <Typography
              sx={{
                fontWeight: 700,
                marginLeft: 1,
              }}
              className={classes.username}
            >
              {conversation.message.name}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.chatContainer}>
          <Box>
            {conversation.messages.map((message: any) => {
              const time = moment('12/12/32').format('h:mm');

              return conversation.profileId === message.senderId ? (
                <Box className={classes.root2}>
                  {moment().format('YYYY-MM-DD') === moment(message.createdAt).format('YYYY-MM-DD')
                    ? moment(message.createdAt).format('MM:SS:A')
                    : moment(message.createdAt).format('YYYY-MM-DD MM:SS:A')}
                  <Box className={classes.bubble}>
                    <Typography className={classes.text}>{message.text}</Typography>
                  </Box>
                </Box>
              ) : (
                <Box className={classes.root3}>
                  <Box>
                    <Typography className={classes.usernameDate}>
                      {console.log(moment().format('YYYY-MM-DD'), moment(message.createdAt).format('YYYY-MM-DD'))}
                      {moment().format('YYYY-MM-DD') === moment(message.createdAt).format('YYYY-MM-DD')
                        ? moment(message.createdAt).format('MM:SS:A')
                        : moment(message.createdAt).format('YYYY-MM-DD MM:SS:A')}
                    </Typography>
                    <Box className={classes.bubbleOther}>
                      <Typography className={classes.textOther}>{message.text}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box className={classes.box}>
            <FilledInput
              classes={{ root: classes.input }}
              disableUnderline
              placeholder="Type something..."
              value={text}
              name="text"
              onChange={handleChange}
              sx={{ width: '85%' }}
            />
            <Button
              type="button"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
              onClick={handleSubmit}
              sx={{ marginBottom: 2, marginLeft: 5 }}
            >
              Send
              <SendIcon className={classes.sendIcon}></SendIcon>
            </Button>
          </Box>
        </Box>
      </>
    </Box>
  );
};

export default Chat;
