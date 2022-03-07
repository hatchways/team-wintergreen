import { Button, CircularProgress, Typography, ListItemIcon } from '@mui/material';
import { Box } from '@mui/system';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import postPhoto from '../../../helpers/APICalls/postPhoto';
import deletePhoto from '../../../helpers/APICalls/deletePhoto';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useState } from 'react';
import { Input } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Profile } from '../../../interface/Profile';

import editProfilePhoto from '../../../helpers/APICalls/editProfilePhoto';
import { DeleteOutline } from '@mui/icons-material';

interface ProfilePhotoProps {
  header: string;
  currentUser?: User; // set to optional but always passed in from settings
  currentProfile?: Profile;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const { updateSnackBarMessage } = useSnackBar();
  const [isSubmitting, setSubmitting] = useState(false);
  const [imageKey, setImagesKey] = useState(currentProfile?.photo);

  const handleDelete = () => {
    if (imageKey && imageKey !== '') {
      deletePhoto(imageKey);
      setImagesKey('');
      editProfilePhoto({ photo: '' });
    }
  };

  const fileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSubmitting(true);
    if (files) {
      postPhoto(files[0])
        .then((data) => {
          if (data.error) {
            console.error({ error: data.error.message });
            updateSnackBarMessage(data.error.message);
          } else if (data.success) {
            const values = { photo: data.success.image as string };
            editProfilePhoto(values);
            setImagesKey(data.success.image as string);
            updateSnackBarMessage('Photo updated!');
          } else {
            // should not get here from backend but this catch is for an unknown issue
            console.error({ data });
            updateSnackBarMessage('An unexpected error occurred. Please try again');
          }
        })
        .then(() => {
          setSubmitting(false);
        })
        .catch((error) => {
          updateSnackBarMessage(error.message);
        });
    }
  };

  const onClick = () => {
    const element = document.getElementById('fileInput');
    if (element) {
      element.click();
    }
  };

  return (
    <Box
      sx={{
        width: 600,
        margin: '0 auto',
      }}
    >
      <SettingHeader header={header} />
      <Box textAlign="center" marginTop={5}>
        {currentUser &&
          (imageKey == '' ? (
            <Avatar
              src={`https://robohash.org/${currentUser.email}.png`}
              sx={{ width: 125, height: 125, margin: 'auto' }}
            />
          ) : (
            <Avatar src={`/image/${imageKey}`} sx={{ width: 125, height: 125, margin: 'auto' }} />
          ))}
        <Typography sx={{ color: '#808080', textAlign: 'center', marginTop: '20px' }} variant="body1">
          Be sure to use a photo that
          <br />
          clearly shows your face
        </Typography>
        <form>
          <Input
            id="fileInput"
            style={{ display: 'none' }}
            onChange={fileSelected}
            type="file"
            inputProps={{ accept: 'image/*', multiple: false }}
          ></Input>
          <Button
            sx={{
              marginTop: '40px',
              padding: '20px 50px',
            }}
            size="large"
            variant="outlined"
            color="primary"
            disableElevation
            onClick={onClick}
          >
            {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Upload a file from your device'}
          </Button>
          <br></br>
          <Button
            sx={{
              marginTop: '40px',
            }}
            onClick={handleDelete}
          >
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <Typography display="inline" sx={{ color: '#808080' }}>
              Delete photo
            </Typography>
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProfilePhoto;
