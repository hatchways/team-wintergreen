import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Chat from './Chat';
const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
    paddingTop: 20,
    borderBottom: '1px solid grey',
    height: '20%',
  },
  title: {
    fontSize: '40px',
    letterSpacing: -0.29,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 15,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const test = [1, 2, 3, 4, 5];
  return (
    <>
      <Box className={classes.root}>
        <Typography sx={{ fontSize: '2em' }} className={classes.title}>
          Inbox Messages
        </Typography>
      </Box>
      {test.map((message) => {
        console.log('hi');
        return (
          <Box key={message}>
            <Chat />
          </Box>
        );
      })}
    </>
  );
};
export default Sidebar;
