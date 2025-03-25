import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { Link, Outlet } from '@remix-run/react';

import type { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'TouchTunes Smooth Operator' }];
};

function Layout() {
  return (
    <>
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>Smooth Operator</Toolbar>
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

      <Box sx={{ mt: 8, p: 2 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
