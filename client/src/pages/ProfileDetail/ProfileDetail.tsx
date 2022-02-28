import { Avatar, Card, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from './useStyles';
import { LocationOn } from '@mui/icons-material';
import RequestForm from '../../components/RequestForm/RequestForm';
import { FormikHelpers } from 'formik';
import { makeBooking } from '../../helpers/APICalls/bookingInfo';
import { BookingInfo } from '../../interface/BookingInfo';
import { useAuth } from '../../context/useAuthContext';
import { loadProfile } from '../../helpers/APICalls/loadProfile';
import { Profile } from '../../interface/Profile';
import ProfileGallery from '../../components/ProfileGallery/ProfileGallery';

const ProfileDetail = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    !profile &&
      loadProfile('6204aa0e6d1e83d0824f9b17').then((data) => {
        if (data.success) {
          setProfile(data.success.profile);
        }
      });
  }, [profile]);

  const handleSubmit = (
    {
      dropInDate,
      dropInTime,
      dropOffDate,
      dropOffTime,
    }: { dropInDate: Date; dropInTime: string; dropOffDate: Date; dropOffTime: string },
    { setSubmitting }: FormikHelpers<{ dropInDate: Date; dropInTime: string; dropOffDate: Date; dropOffTime: string }>,
  ) => {
    if (dropInTime.includes('pm')) {
      dropInDate.setHours(parseInt(dropInTime) + 12, 0, 0, 0);
    } else {
      dropInDate.setHours(parseInt(dropInTime), 0, 0, 0);
    }
    if (dropOffTime.includes('pm')) {
      dropOffDate.setHours(parseInt(dropOffTime) + 12, 0, 0, 0);
    } else {
      dropOffDate.setHours(parseInt(dropOffTime), 0, 0, 0);
    }

    if (loggedInUser && profile) {
      const bookingInfo: BookingInfo = {
        _id: undefined,
        petOwner: loggedInUser,
        sitter: profile.userId,
        startDate: dropInDate,
        endDate: dropOffDate,
        status: 'pending',
        paid: true,
      };

      makeBooking(bookingInfo);
      setSubmitting(false);
    } else {
      // add a snake bar for request login
    }
  };

  return profile ? (
    <Grid container justifyContent="space-evenly">
      <Grid item md={6}>
        <Card elevation={8} className={classes.card}>
          <Grid container direction="column">
            <Grid item>
              <img className={classes.userBackground} src={profile.coverImage} alt="user cover image" />
            </Grid>
            <Grid item alignSelf="center">
              <Avatar src={profile.photo} sx={{ width: 100, height: 100, border: 3 }} className={classes.avatar} />
            </Grid>
            <Grid item alignSelf="center">
              <Typography variant="h4" className={classes.name} sx={{ fontWeight: 'bold' }}>
                {profile.name}
              </Typography>
              <Typography variant="subtitle1" className={classes.name} sx={{ fontWeight: 'light' }}>
                Loving {profile.accountType.replace('_', ' ')}
              </Typography>
            </Grid>
            <Grid item alignSelf="center">
              <Typography variant="subtitle1" sx={{ fontWeight: 'light' }}>
                <LocationOn color="primary" />
                {profile.address}
              </Typography>
            </Grid>
            <Grid item display="flex" justifyContent="center">
              <Card elevation={0} className={classes.descriptionCard}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  About me
                </Typography>
                <Typography variant="body1">{profile.description}</Typography>
                <ProfileGallery images={profile.gallery} />
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item md={3}>
        <RequestForm className={classes.card} profile={profile} handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  ) : (
    <CircularProgress />
  );
};

export default ProfileDetail;
