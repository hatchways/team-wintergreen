import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Button, FilledInput, FormControl, Typography } from '@mui/material';
import moment from 'moment';
import { Badge } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createNewMessage from '../../../helpers/APICalls/createNewMessage';
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
  },
  profilePic: {
    height: 44,
    width: 44,
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: 16,
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
}));

const Chat = (conversation: any) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    console.log(conversation.conversationId);
    const data = {
      text,
      conversationId: conversation.conversationId as string,
    };
    createNewMessage(data).then((data) => {
      if (data.error) {
        console.log(data);
        console.error({ error: data.error.message });
      } else if (data.success) {
        console.log(data.success);
        const conversationData = {
          conversationId: conversation.conversationId,
        };
        conversation.handleConversation(conversationData);
        setText('');
      }
    });
  };
  return (
    <Box className={classes.root}>
      <>
        {console.log(conversation)}
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

              return conversation.userId === message.senderId ? (
                <Box className={classes.root2}>
                  {moment(message.createdAt).format('YYYY-MM-DD MM:SS')}
                  <Box className={classes.bubble}>
                    <Typography className={classes.text}>{message.text}</Typography>
                  </Box>
                </Box>
              ) : (
                <Box className={classes.root3}>
                  <Box>
                    <Typography className={classes.usernameDate}>
                      {moment(message.createdAt).format('YYYY-MM-DD MM:SS')}
                    </Typography>
                    <Box className={classes.bubbleOther}>
                      <Typography className={classes.textOther}>{message.text}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <FormControl fullWidth hiddenLabel>
            <FilledInput
              classes={{ root: classes.input }}
              disableUnderline
              placeholder="Type something..."
              value={text}
              name="text"
              onChange={handleChange}
            />
          </FormControl>
          <Button
            type="button"
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
            disableElevation
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Box>
      </>
    </Box>
  );
};

export default Chat;
