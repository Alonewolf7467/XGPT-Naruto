// src/components/Header.js
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My AI Chat</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
