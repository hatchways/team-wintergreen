import { Grid } from '@mui/material';
import Sidebar from './SideBar/SideBar';
import Chat from './Chat/Chat';
import { useState, useEffect } from 'react';
import getMessageInfo from '../../helpers/APICalls/getMessageInfo';
import { useAuth } from '../../context/useAuthContext';
import { Redirect, useLocation } from 'react-router-dom';
import createNewConversation from '../../helpers/APICalls/createNewConversation';
import { useHistory } from 'react-router-dom';
const Messages = () => {
  const [conversationId, setConversationId] = useState('');
  const senderId = new URLSearchParams(useLocation().search).get('profileId') as string;
  const text = new URLSearchParams(useLocation().search).get('text') as string;
  const [fromProfilePage, setFromProfilePage] = useState(false);
  const { profile } = useAuth();
  const [message, setMessage] = useState([]);
  const [profileId, setProfileId] = useState('');
  const [check, setCheck] = useState(false);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState([]);
  const history = useHistory();
  const [newMessage, setNewMessage] = useState(false);
  const handleConversation = (e: any) => {
    console.log(profile);
    setCheck(false);
    setMessage(e);
    setConversationId(e.conversationId);
    setProfileId(profile._id);
    fillMessageDetails(e.conversationId);
  };
  const fillMessageDetails = async (id: string) => {
    await getMessageInfo(id).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
      } else if (data.success) {
        setMessages(data.success.message);
        // if (messages.length)
        setCheck(true);
      }
    });
  };

  useEffect(() => {
    const createConversation = async () => {
      const data = {
        text,
        senderId,
        conversationId,
      };
      await createNewConversation(data).then((data) => {
        if (data.error) {
          console.error({ error: data.error.message });
        } else if (data.success) {
          setNewMessage(true);
        }
      });
    };
    if (text && senderId) {
      createConversation();
      history.push({
        pathname: '/messages',
      });
    } else {
      setNewMessage(true);
    }
  }, [conversationId, senderId, text, history, newMessage]);
  return (
    <Grid container maxHeight="100vh">
      <Grid item xs={3}>
        {newMessage && <Sidebar handleConversation={handleConversation} />}
      </Grid>
      <Grid item xs={9}>
        {check && (
          <Chat
            conversationId={conversationId}
            message={message}
            fillMessageDetails={fillMessageDetails}
            messages={messages}
            profileId={profileId}
            setNewMessage={setNewMessage}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Messages;
