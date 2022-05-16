import { Grid, Box } from '@mui/material';
import useStyle from './useStyles';
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import { Profile } from '../../interface/Profile';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container-typescript';
interface Props {
  profiles: Profile[];
}
const SearchDisplay = ({ profiles }: Props) => {
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
      <DropTarget targetKey="foo">
        {profiles.map((card, index) => (
          <DragDropContainer key={index} targetKey="foo">
            <Box key={index} className={classes.card}>
              <ProfileCard name={`${card}`} />
            </Box>
          </DragDropContainer>
        ))}
      </DropTarget>
    </Grid>
  );
};

export default SearchDisplay;
