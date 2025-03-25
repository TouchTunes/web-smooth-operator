import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, Outlet } from '@remix-run/react';
import { useState } from 'react';

import type { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'TouchTunes Smooth Operator' }];
};

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_CLOSED = 64;

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((previousState) => !previousState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ ml: 2 }}>
            TouchTunes Smooth Operator
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        sx={{
          width: isDrawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isDrawerOpen ? DRAWER_WIDTH : DRAWER_WIDTH_CLOSED,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer}>
            {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {['Reports', 'Operators'].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${text.toLowerCase()}`}
                sx={{
                  minHeight: 48,
                  justifyContent: isDrawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                  {index % 2 === 0 ? <AssessmentIcon /> : <AccountBoxIcon />}
                </ListItemIcon>
                {isDrawerOpen && <ListItemText primary={text} sx={{ ml: 2 }} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 6 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
