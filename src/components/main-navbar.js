import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar } from '@mui/material';
import { Menu as MenuIcon } from '../icons/menu';
import { Logo } from './logo';

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        color: 'text.secondary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: 64 }}
        >
          <NextLink
            href="/"
            passHref
          >
            <a>
              <Logo
                sx={{
                  display: {
                    md: 'inline',
                    xs: 'none'
                  },
                  height: 40,
                  width: 40
                }}
              />
            </a>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            onClick={onOpenSidebar}
            sx={{
              display: {
                md: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                md: 'flex',
                xs: 'none'
              }
            }}
          >
            <NextLink
              href="/dashboard"
              passHref
            >
              <Link
                color="textSecondary"
                underline="none"
                variant="subtitle2"
              >
                Prices
              </Link>
            </NextLink>
            <NextLink
              href="/browse"
              passHref
            >
              <Link
                color="textSecondary"
                sx={{ ml: 2 }}
                underline="none"
                variant="subtitle2"
              >
                Learn
              </Link>
            </NextLink>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 2 }}
                underline="none"
                variant="subtitle2"
              >
                Individuals
              </Link>
            </NextLink>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 2 }}
                underline="none"
                variant="subtitle2"
              >
                Businesses
              </Link>
            </NextLink>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 2 }}
                underline="none"
                variant="subtitle2"
              >
                Developers
              </Link>
            </NextLink>
            <NextLink
              href="/docs/welcome"
              passHref
            >
              <Link
                color="textSecondary"
                component="a"
                sx={{ ml: 2, mr: 10 }}
                underline="none"
                variant="subtitle2"
              >
                Company
              </Link>
            </NextLink>
            <Button
              component="a"
              href="https://material-ui.com/store/items/devias-kit-pro"
              size="medium"
              sx={{ ml: 2 }}
              target="_blank"
              variant="outlined"
            >
              Sign Up
            </Button>
            <Button
              component="a"
              href="/dashboard"
              size="medium"
              sx={{ ml: 2 }}
              //target="_blank"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
