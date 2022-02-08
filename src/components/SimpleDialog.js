import * as React from "react";
import { useState } from "react";
import router from "next/router";
import PropTypes from "prop-types";
import Image from 'next/image';
import { Icon, ListItemButton, SvgIcon } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { useMoralis } from "react-moralis";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { connectors } from "../components/authentication/config";
import { useMounted } from "../hooks/use-mounted";
import { WalletConnect } from "../icons/wallet-connect";
import MathWallet from "../components/authentication/WalletIcons/MathWallet.svg"
import SafePal from "../components/authentication/WalletIcons/SafePal.svg"
import {Search} from "../icons/search.js"


export const SimpleDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const { authenticate, isAuthenticated, user } = useMoralis();
  const isMounted = useMounted();
  

  const handleClose = () => {
    onClose(true);
  };

  const handleListItemClick = (value) => {
    onClose(true);
    console.log("clicked", value);
  };

console.log(connectors)

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "20px",
        }}
        
        
      >
        Select Wallet Provider
      </DialogTitle>

      

      <List sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {connectors.map(({ title, icon, connectorId }, key) => (
          
          <ListItem
          
            button 
            onClick={async() => {
                handleListItemClick(title)
                try {
                    await authenticate({
                      provider: connectorId,
                      signingMessage: "Authorize linking of your wallet",
                    });
                    window.localStorage.setItem("connectorId", connectorId);
                    if (isAuthenticated) {
                        console.log("we are authenticated")
                        const returnUrl = router.query.returnUrl || '/dashboard';
                        router.push(returnUrl);}
                    
                  } catch (error) {
    
                  }
                  
                }
            }
                
            
            key={key}
            sx={{
              display: "block",

              cursor: "pointer",}}
         
            
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                
                fill: "rgb(40, 13, 95)",
                flexShrink: "0",
                marginBottom: "8px",
                height: "80px",
              }}
              
            >
             <SvgIcon component={title} />
              
              {/* <img src={icon?.src }  alt={title} loading="lazy" /> */}
              
              
              
              
            </ListItemIcon>
            <ListItemText
              sx={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
              }}
              primary={title}
              fontWeight="700"
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  //   selectedValue: PropTypes.string.isRequired,
};
