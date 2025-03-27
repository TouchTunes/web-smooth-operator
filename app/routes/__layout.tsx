import { useAuth0 } from '@auth0/auth0-react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, Outlet } from '@remix-run/react';
import { useEffect, useState } from 'react';

import type { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'TouchTunes Smooth Operator' }];
};

const DRAWER_WIDTH = 240;
const DRAWER_WIDTH_CLOSED = 64;

const PAGES = [
  { value: 0, icon: <AssessmentIcon />, url: '/', name: 'Reports' },
  {
    value: 1,
    icon: <AccountBoxIcon />,
    url: '/operators',
    name: 'Data Fetching',
  },
  {
    value: 2,
    icon: <LocalFireDepartmentIcon />,
    url: '/firebase',
    name: 'Firebase',
  },
];

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
    logout,
  } = useAuth0();

  const toggleDrawer = () => {
    setIsDrawerOpen((previousState) => !previousState);
  };

  useEffect(() => {
    console.log('isAuthLoading');
    console.log(isAuthLoading);
  }, [isAuthLoading]);

  useEffect(() => {
    console.log('isAuthenticated');
    console.log(isAuthenticated);
  }, [isAuthLoading]);

  useEffect(() => {
    console.log('user');
    console.log(user);
  }, [isAuthLoading]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                {isDrawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" noWrap sx={{ ml: 2 }}>
                TouchTunes Smooth Operator
              </Typography>
            </>
            <Box>
              <Button onClick={() => loginWithRedirect()}>Login</Button>
              <Button
                onClick={() =>
                  logout({
                    logoutParams: {
                      returnTo: 'http://localhost:5173/api/auth0callback',
                    },
                  })
                }
              >
                Logout
              </Button>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        onClose={toggleDrawer}
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
        <List sx={{ mt: 5 }}>
          {PAGES.map((page, index) => (
            <ListItem key={page.value} disablePadding>
              <ListItemButton
                component={Link}
                to={PAGES.find((page) => page.value === index)?.url || '/'}
                onClick={toggleDrawer}
                sx={{
                  minHeight: 48,
                  justifyContent: isDrawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                  {page.icon}
                </ListItemIcon>
                {isDrawerOpen && (
                  <ListItemText primary={page.name} sx={{ ml: 2 }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Container maxWidth="lg" sx={{ flexGrow: 1, p: 3, mt: 6 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
