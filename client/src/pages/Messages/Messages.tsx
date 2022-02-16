import { Grid } from '@mui/material';
import Sidebar from './SideBar/SideBar';
import Chat from './Chat/Chat';
import { useState } from 'react';
import getMessageInfo from '../../helpers/APICalls/getMessageInfo';
import { useAuth } from '../../context/useAuthContext';
const Messages = () => {
  const [conversationId, setConversationId] = useState('');
  const { profile } = useAuth();

  const [message, setMessage] = useState([]);
  const [userId, setUserId] = useState('');
  const [check, setCheck] = useState(false);
  const [messages, setMessages] = useState([]);
  const handleConversation = (e: any) => {
    setCheck(false);
    setMessage(e);
    setConversationId(e.conversationId);
    setUserId(profile.userId);
    fillMessageDetails(conversationId);
  };
  const fillMessageDetails = async (id: string) => {
    await getMessageInfo(id).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
      } else if (data.success) {
        setMessages(data.success.message);
        if (messages.length) setCheck(true);
        console.log(messages);
      }
    });
  };
  return (
    <Grid container maxHeight="100vh">
      <Grid item xs={3}>
        <Sidebar conversationId={conversationId} handleConversation={handleConversation} />
      </Grid>
      <Grid item xs={9}>
        <Chat
          conversationId={conversationId}
          message={message}
          handleConversation={handleConversation}
          messages={messages}
          userId={userId}
        />
      </Grid>
    </Grid>
  );
};

export default Messages;
