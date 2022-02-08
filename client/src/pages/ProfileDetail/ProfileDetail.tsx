import { Avatar, Card, CircularProgress, Grid, Typography } from '@mui/material';
import { useAuth } from '../../context/useAuthContext';
import React from 'react';
import { useStyles } from './useStyles';
import { LocationOn } from '@mui/icons-material';
import RequestForm from '../../components/RequestForm/RequestForm';
import { FormikHelpers } from 'formik';

const ProfileDetail = (): JSX.Element => {
  const classes = useStyles();
  const { profile } = useAuth(); // change it to the real way to get profile

  const title = () => {
    return 'Loving pet sitter';
  };

  return profile ? (
    <Grid container justifyContent="space-evenly">
      <Grid item md={5}>
        <Card elevation={8} className={classes.card}>
          <Grid container direction="column">
            <Grid item>
              <img
                className={classes.userBackground}
                src="http://pic.616pic.com/bg_w1180/00/03/56/J9aghMknMg.jpg"
                alt="user background"
              />
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
              <Typography variant="h6" sx={{ fontWeight: 'light' }}>
                <LocationOn color="primary" />
                {profile.address}
              </Typography>
            </Grid>
            <Grid item display="flex" justifyContent="center">
              <Card elevation={2} className={classes.descriptionCard}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  About me
                </Typography>
                <Typography variant="body1">{profile.description}</Typography>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item md={4}>
        <RequestForm className={classes.card} profile={profile} handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  ) : (
    <CircularProgress />
  );
};

export default ProfileDetail;
