import { FormControl, InputBase, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';

import {
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as DropdownMenuItem,
  styled,
  Badge,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { Notification } from '../../interface/Notification';
import Avatar from '@mui/material/Avatar';
import { useStyles } from './useStyles';
import { NotificationImportant } from '@mui/icons-material';

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 8,
    border: '1px solid #dbdbdb',
    fontSize: 16,
    width: '100%',
    padding: '15px',
  },
}));

const NotificationsMenuItem = (notifications: [Notification]) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  let key = 0;
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    handleScroll;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderNotifications = () => {
    return [
      notifications.map((notification) => {
        return (
          <NavLink key={`notification-${key++}`} className={classes.navbarItem} to={'/'}>
            <DropdownMenuItem onClick={handleClose}>
              {notification.creatorPhotoKey == '' ? (
                <Avatar
                  src={`https://robohash.org/${notification.createdBy}.png`}
                  sx={{ width: 125, height: 125, margin: 'auto' }}
                />
              ) : (
                <Avatar
                  src={`/image/${notification.creatorPhotoKey}`}
                  sx={{ width: 125, height: 125, margin: 'auto' }}
                />
              )}
              <ListItemText>
                {' ' + notification.description + ' ' + notification.createdBy + ' ' + notification.updatedAt}
              </ListItemText>
            </DropdownMenuItem>
            <Divider />
          </NavLink>
        );
      }),
    ];
  };
  const test = (scrollPosition: number) => {
    console.log('scroll ' + scrollPosition);
    console.log(scrollEl);
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollEl, setScrollEl] = useState<null | HTMLElement>(null);
  const handleScrollOpen = (event: React.MouseEvent<HTMLElement>) => {
    setScrollEl(event.currentTarget);
  };
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    scrollEl?.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollEl?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollEl]);
  return (
    <div onClick={handleMenuOpen}>
      {test(scrollPosition)}
      <Badge badgeContent={notifications ? notifications.length : 0} color="primary">
        Notifications
      </Badge>
      <Menu
        id="lock-menur"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {notifications && renderNotifications()}
      </Menu>
    </div>
  );
};

export default NotificationsMenuItem;
