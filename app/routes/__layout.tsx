import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { Link, Outlet } from '@remix-run/react';
import { useState } from 'react';

import type { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'TouchTunes Smooth Operator' }];
};

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => () => {
    setIsDrawerOpen((previousState) => !previousState);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" onClick={toggleDrawer()}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer()}
        PaperProps={{ sx: { width: 250 } }}
      >
        <Box>
          <IconButton onClick={toggleDrawer()}>
            {isDrawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          {['Reports', 'Operators'].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={`/${text.toLocaleLowerCase()}`}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <AssessmentIcon /> : <AccountBoxIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box sx={{ mt: 2, p: 2 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
