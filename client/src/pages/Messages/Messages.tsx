import { Grid } from '@mui/material';
import Sidebar from './SideBar/Sidebar';
import Chat from './Chat/Chat';
const Messages = () => {
  return (
    <Grid container maxHeight="100vh">
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <Chat />
      </Grid>
    </Grid>
  );
};

export default Messages;
