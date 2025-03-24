import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from '@remix-run/react';

import type { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Smooth Operator' }];
};

function Layout() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/dashboard"
              sx={{ flexGrow: 1, color: 'text.primary' }}
            >
              Smooth Operator
            </Typography>
            <Button component={Link} to="/operators" color="inherit">
              Operators
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mt: 8, p: 2 }}>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
