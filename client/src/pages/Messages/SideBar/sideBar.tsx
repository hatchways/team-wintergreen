import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Chat from './Chat';
import getConversation from '../../../helpers/APICalls/getConversation';
const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
    paddingTop: 20,
    borderBottom: '1px solid grey',
    height: '12vh',
  },
  title: {
    fontSize: '40px',
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 15,
  },
}));
interface Props {
  handleConversation: (e: any) => void;
  conversationId: string;
}
const SideBar = ({ handleConversation, conversationId }: Props) => {
  const classes = useStyles();
  const test = [1, 2, 3, 4, 5];
  const [conversation, setConversation] = useState([]);
  const [check, setCheck] = useState(true);
  useEffect(() => {
    const getData = () => {
      getConversation().then((data) => {
        if (data.error) {
          console.error({ error: data.error.message });
        } else if (data.success) {
          const newConversation = data.success.newConversation;
          setConversation(newConversation);
        }
      });
    };
    if (check) {
      getData();
      setCheck(false);
    }
  }, [conversation, check]);
  return (
    <>
      <Box className={classes.root}>
        <Typography sx={{ fontSize: '2em' }} className={classes.title}>
          Inbox Messages
        </Typography>
      </Box>
      {conversation.map((message) => {
        return (
          <Box key={message} onClick={() => handleConversation(message)}>
            <Chat message={message} />
          </Box>
        );
      })}
    </>
  );
};
export default SideBar;
