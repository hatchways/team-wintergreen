import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Chat from './Chat';
import getConversation from '../../../helpers/APICalls/getConversation';
import useStyles from './useStyles';

interface Props {
  handleConversation: (e: any) => void;
}
const SideBar = ({ handleConversation }: Props) => {
  const classes = useStyles();
  const [conversation, setConversation] = useState([]);
  const [check, setCheck] = useState(true);
  useEffect(() => {
    const getData = async () => {
      await getConversation().then((data) => {
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
