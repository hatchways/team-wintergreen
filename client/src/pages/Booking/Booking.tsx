import { useAuth } from '../../context/useAuthContext';
import { Box, Button, CircularProgress, Grid, List, ListItem, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AvatarDisplay from '../../components/AvatarDisplay/AvatarDisplay';
import { useStyles } from './useStyles';
import BookingSlot, { getBookingTime } from './BookingSlot/BookingSlot';
import { BookingInfo } from '../../interface/BookingInfo';
import SettingsIcon from '@mui/icons-material/Settings';
import Calendar from 'react-calendar';
import { getBookings } from '../../helpers/APICalls/bookingInfo';

export default function Booking(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const [noBookingInfo, setNoBookingInfo] = useState<boolean>(false);
  const [nextBookingInfo, setNextBookingInfo] = useState<BookingInfo>();
  const [currentBookingInfos, setCurrentBookingInfos] = useState<BookingInfo[]>([]);
  const [pastBookingInfos, setPastBookingInfos] = useState<BookingInfo[]>([]);
  const [bookingDates, setBookingDates] = useState<Date[]>([]);

  useEffect(() => {
    !noBookingInfo &&
      !currentBookingInfos.length &&
      !pastBookingInfos.length &&
      getBookings().then((data) => {
        if (data.error) {
          console.log(data.error.message);
        } else if (data.success) {
          const bookingInfos = data.success.bookingInfos;
          if (bookingInfos?.length) {
            const now = new Date();
            const past: BookingInfo[] = [];
            const current: BookingInfo[] = [];
            const dates: Date[] = [];

            bookingInfos.forEach((bookingInfo) => {
              bookingInfo.startDate = new Date(bookingInfo.startDate);
              bookingInfo.endDate = new Date(bookingInfo.endDate);
            });

            bookingInfos
              .sort((a, b) => {
                return a.startDate.getTime() - b.startDate.getTime();
              })
              .forEach((bookingInfo) => {
                dates.push(bookingInfo.startDate);
                if (bookingInfo.startDate.getTime() < now.getTime()) {
                  past.push(bookingInfo);
                } else {
                  current.push(bookingInfo);
                }
              });
            setBookingDates(dates);
            setCurrentBookingInfos(current);
            setPastBookingInfos(past);
          } else {
            setNoBookingInfo(true);
          }
        } else {
          // should not get here from backend but this catch is for an unknown issue
          console.error({ data });
        }
      });
  }, [noBookingInfo, currentBookingInfos, pastBookingInfos, loggedInUser]);

  useEffect(() => {
    for (const booking of currentBookingInfos) {
      if (booking.status === 'accepted') {
        setNextBookingInfo(booking);
        return;
      }
    }
  }, [currentBookingInfos]);

  return currentBookingInfos.length || pastBookingInfos.length || noBookingInfo || nextBookingInfo ? (
    <Grid container direction="row" justifyContent="space-evenly" className={classes.root}>
      <Grid item md={5}>
        <Grid container direction={'column'}>
          <Grid item>
            <Paper elevation={12} className={classes.paperContainer}>
              {nextBookingInfo ? (
                <Grid container>
                  <Grid item md={11}>
                    <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Your next booking:
                    </Typography>
                    <Typography className={classes.label} variant="h6">
                      {getBookingTime(nextBookingInfo.startDate, nextBookingInfo.endDate)}
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
              ) : (
                <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                  There is no booking for you.
                </Typography>
              )}
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
                    {currentBookingInfos.length ? (
                      currentBookingInfos.map((bookingInfo) => (
                        <BookingSlot bookingInfo={bookingInfo} key={bookingInfo._id} updatable={true} />
                      ))
                    ) : (
                      <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                        {"You don't more booking."}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
                <ListItem>
                  <Box marginY={3} sx={{ width: '100%' }}>
                    <Typography className={classes.label} variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      Past bookings:
                    </Typography>
                    {pastBookingInfos.length ? (
                      pastBookingInfos.map((bookingInfo) => (
                        <BookingSlot bookingInfo={bookingInfo} key={bookingInfo._id} updatable={false} />
                      ))
                    ) : (
                      <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                        {"You don't have past booking."}
                      </Typography>
                    )}
                  </Box>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={4}>
        <Paper elevation={12} className={classes.paperContainer}>
          <Calendar
            className={classes.calendar}
            value={nextBookingInfo?.startDate}
            locale="en-US"
            tileClassName={({ date }) => {
              return bookingDates.find((bookingDate) => bookingDate.toLocaleDateString() === date.toLocaleDateString())
                ? classes.activeDate
                : classes.inactiveDate;
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <CircularProgress />
  );
}
