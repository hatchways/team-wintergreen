import { useAuth } from '../../context/useAuthContext';
import { User } from '../../interface/User';
import { Box, Button, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import { useStyles } from './useStyles';
import BookingSlot, { getBookingTime } from './BookingSlot/BookingSlot';
import { BookingInfo } from '../../interface/BookingInfo';
import SettingsIcon from '@mui/icons-material/Settings';
import Calendar from 'react-calendar';

export default function Booking(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [bookedDate, setBookedDate] = useState<Date[]>([new Date()]);

  // placeholders
  const bookingInfo: BookingInfo = {
    accepted: true,
    declined: false,
    endDate: new Date('2022-02-15 14:00:00 GMT-0500'),
    paid: false,
    petOwner: loggedInUser as User,
    sitter: loggedInUser as User,
    startDate: new Date('2022-02-15 10:00:00 GMT-0500'),
  };
  const nextBookingInfo = bookingInfo;
  const currentBookingInfos = [bookingInfo, bookingInfo];
  const pastBookingInfos = currentBookingInfos;

  return (
    <Grid container direction="row" justifyContent="space-evenly" className={classes.root}>
      <Grid item md={5}>
        <Grid container direction={'column'}>
          <Grid item>
            <Paper elevation={12} className={classes.paperContainer}>
              <Grid container>
                <Grid item md={11}>
                  <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    Your next booking:
                  </Typography>
                  <Typography className={classes.label} variant="h6">
                    {getBookingTime(bookingInfo.startDate, bookingInfo.endDate)}
                  </Typography>
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <AvatarDisplay loggedIn={!!loggedInUser} user={nextBookingInfo.petOwner} />
                    <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                      {loggedInUser?.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={1}>
                  <Button className={classes.settingButton} sx={{ minWidth: '100%' }}>
                    <SettingsIcon sx={{ color: 'gray' }} />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item marginY={3}>
            <Paper elevation={12} className={classes.paperContainer}>
              <List className={classes.bookingList}>
                <ListItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Current bookings:
                    </Typography>
                    {currentBookingInfos.map((bookingInfo, index) => (
                      <BookingSlot bookingInfo={bookingInfo} key={index} />
                    ))}
                  </Box>
                </ListItem>
                <ListItem>
                  <Box marginY={3} sx={{ width: '100%' }}>
                    <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Past bookings:
                    </Typography>
                    {pastBookingInfos.map((bookingInfo, index) => (
                      <BookingSlot bookingInfo={bookingInfo} key={index} />
                    ))}
                  </Box>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Paper elevation={12} className={classes.paperContainer}>
          <Calendar className={classes.calendar} value={bookedDate} locale="en-US" />
        </Paper>
      </Grid>
    </Grid>
  );
}
