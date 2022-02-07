import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { BookingInfo } from '../../../interface/BookingInfo';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import { useStyles } from './useStyles';
import { Key } from 'react';

interface Props {
  bookingInfo: BookingInfo;
  key: Key | null | undefined;
}

const BookingSlot = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card elevation={2} variant="outlined" className={classes.card}>
      <Grid container>
        <Grid item md={8}>
          <CardContent>
            <Typography variant="h6">
              {getBookingTime(props.bookingInfo.startDate, props.bookingInfo.endDate)}
            </Typography>
            <Box display="flex" alignItems="center">
              <AvatarDisplay loggedIn={true} user={props.bookingInfo.petOwner} />
              <Typography variant="h6" sx={{ margin: '10px', fontWeight: 'bold' }}>
                {props.bookingInfo.petOwner.name}
              </Typography>
            </Box>
          </CardContent>
        </Grid>
        <Grid item md={3} alignSelf="center">
          <CardContent>
            <Typography variant="subtitle2" className={classes.status}>
              {props.bookingInfo.accepted ? 'accepted' : props.bookingInfo.declined ? 'declined' : 'pending'}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item md={1}>
          <Button className={classes.settingButton} sx={{ minWidth: '100%' }}>
            <SettingsIcon className={classes.settingsIcon} sx={{ fontSize: '15px' }} />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export function getBookingTime(start: Date, end: Date) {
  const monthStr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getTimeString = (time: number) => {
    return time < 12 ? `${time}AM` : `${time - 12}PM`;
  };

  const day = start.getDay();
  const month = monthStr[start.getMonth()];
  const year = start.getFullYear();
  const startAt = getTimeString(start.getHours());
  const endAt = getTimeString(end.getHours());

  return `${day} ${month} ${year}, ${startAt} - ${endAt}`;
}

export default BookingSlot;
