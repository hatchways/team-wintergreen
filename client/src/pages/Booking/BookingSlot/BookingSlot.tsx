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
    <Card variant="outlined" className={classes.card}>
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
              {props.bookingInfo.status}
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
  const day = start.toLocaleString('en-US', { day: 'numeric' });
  const month = start.toLocaleString('en-US', { month: 'long' });
  const year = start.getFullYear();
  const startAt = start.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  const endAt = end.toLocaleString('en-US', { hour: 'numeric', hour12: true });

  return `${day} ${month} ${year}, ${startAt} - ${endAt}`;
}

export default BookingSlot;
