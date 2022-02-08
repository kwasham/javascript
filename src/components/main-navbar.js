import PropTypes from "prop-types";
import { useState } from "react";
import NextLink from "next/link";
import { SimpleDialog } from "../components/SimpleDialog";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon } from "../icons/menu";
import { Logo } from "./logo";

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Metamask");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    //setSelectedValue(value)
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        color: "text.secondary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <NextLink href="/" passHref>
            <a>
              <Logo
                sx={{
                  display: {
                    md: "inline",
                    xs: "none",
                  },
                  height: 40,
                  width: 40,
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
                md: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: "center",
              display: {
                md: "flex",
                xs: "none",
              },
            }}
          >
            <NextLink href="/dashboard" passHref>
              <Link color="textSecondary" underline="none" variant="subtitle2">
                Prices
              </Link>
            </NextLink>
            <NextLink href="/browse" passHref>
              <Link
                color="textSecondary"
                sx={{ ml: 2 }}
                underline="none"
                variant="subtitle2"
              >
                Learn
              </Link>
            </NextLink>
            <NextLink href="/docs/welcome" passHref>
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
            <NextLink href="/docs/welcome" passHref>
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
            <NextLink href="/docs/welcome" passHref>
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
            <NextLink href="/docs/welcome" passHref>
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
              href="/tester"
              size="medium"
              sx={{ ml: 2 }}
              target="_blank"
              variant="outlined"
            >
              Sign Up
            </Button>
            <Button
              component="a"
              //href="/dashboard"
              size="medium"
              sx={{ ml: 2 }}
              variant="contained"
              onClick={handleClickOpen}
            >
              Connect Wallet
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
