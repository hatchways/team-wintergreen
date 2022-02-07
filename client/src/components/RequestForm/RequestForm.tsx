import { Autocomplete, Box, Card, Grid, TextField, Typography } from '@mui/material';
import { Profile } from '../../interface/Profile';
import { Star } from '@mui/icons-material';
import { useStyles } from './useStyles';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Form, Formik, FormikHelpers } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface Props {
  className?: string;
  profile: Profile;
  handleSubmit: (
    {
      dropInDate,
      dropInTime,
      dropOffDate,
      dropOffTime,
    }: {
      dropInDate: Date;
      dropInTime: Date;
      dropOffDate: Date;
      dropOffTime: Date;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      dropInDate: Date;
      dropInTime: Date;
      dropOffDate: Date;
      dropOffTime: Date;
    }>,
  ) => void;
}

const getTimes = (hour: number) => {
  const times = [];
  for (let i = hour; i < 24; i++) {
    times.push(`${i % 12 ? i % 12 : 12} ${i / 12 < 1 ? 'am' : 'pm'}`);
  }
  return times;
};

const RequestForm = ({ className, profile, handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();
  const today = new Date();
  console.log(today.toDateString());
  return (
    <Card elevation={8} className={className}>
      <Grid container direction="column" alignItems="center" marginTop={3}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          ${profile.price}/hr
        </Typography>
        <Typography className={classes.star}>{getRankInStar(profile.rank)}</Typography>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Formik
              initialValues={{
                dropInDate: new Date(),
                dropInTime: new Date(),
                dropOffDate: new Date(),
                dropOffTime: new Date(),
              }}
              validationSchema={Yup.object().shape({
                dropInDate: Yup.date().min(new Date()),
                dropOffDate: Yup.date().when(
                  'dropInDate',
                  (dropInDate, schema) => dropInDate && schema.min(dropInDate),
                ),
              })}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form className={classes.form}>
                  <Box display="flex" flexDirection="column">
                    <label className={classes.label}>Drop in</label>
                    <Box display="flex">
                      <DatePicker
                        onChange={(value) => props.setFieldValue('dropInDate', value)}
                        value={props.values.dropInDate}
                        renderInput={(params) => <TextField sx={{ width: '60%' }} {...params} />}
                      />
                      <Autocomplete
                        onChange={(value) => props.setFieldValue('dropInTime', value)}
                        value={getTimes(new Date().getHours())[0]}
                        options={getTimes(
                          props.values.dropInDate.toDateString() === today.toDateString()
                            ? props.values.dropInDate.getHours()
                            : 0,
                        )}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ width: '40%' }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="column" marginTop={3}>
                    <label className={classes.label}>Drop Off</label>
                    <Box display="flex">
                      <DatePicker
                        onChange={(value) => props.setFieldValue('dropOffDate', value)}
                        value={props.values.dropOffDate}
                        renderInput={(params) => <TextField sx={{ width: '60%' }} {...params} />}
                        // sx={{ width: '50%' }}
                      />
                      <Autocomplete
                        onChange={(value) => props.setFieldValue('dropOffTime', value)}
                        value={getTimes(new Date().getHours())[0]}
                        options={getTimes(
                          props.values.dropOffDate.toDateString() === today.toDateString()
                            ? props.values.dropOffDate.getHours()
                            : 0,
                        )}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ width: '40%' }}
                      />
                    </Box>
                  </Box>

                  <Box textAlign="center" marginTop={5}>
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disableElevation
                    >
                      {props.isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send request'}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Card>
  );
};

const getRankInStar = (rank: number): JSX.Element => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rank >= 1) {
      stars.push(<Star />);
      rank -= 1;
    } else {
      stars.push(<Star color="disabled" />);
    }
  }
  return <Box>{stars.map((value) => value)}</Box>;
};

export default RequestForm;
