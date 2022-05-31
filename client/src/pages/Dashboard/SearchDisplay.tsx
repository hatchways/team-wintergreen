import { Grid, Box } from '@mui/material';
import useStyle from './useStyles';
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import { Profile } from '../../interface/Profile';
import RLDD from 'react-list-drag-and-drop/lib/RLDD';
interface Props {
  profiles: Profile[];
}
function SearchDisplay({ profiles }: Props): JSX.Element {
  const classes = useStyle();

  return (
    <Grid
      className={classes.box}
      container
      spacing={3}
      rowSpacing={1}
      columnSpacing={{ xs: 2, sm: 5, md: 5 }}
      alignItems="center"
      justifyContent="center"
    >
      {profiles.map((card, index) => (
        <Box key={index} className={classes.card}>
          <ProfileCard name={`${card}`} />
        </Box>
      ))}
    </Grid>
  );
}

export default SearchDisplay;
