import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";
import { Avatar } from '@mui/material';

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const { account, isAuthenticated } = useMoralis();
  console.log("from the blockie function", props)
  if (!props.address && (!account || !isAuthenticated)) return <Avatar sx={{width:40, height:40}} />;

  return (
    <Blockies seed={props.currentWallet ? account.toLowerCase() : props.account.toLowerCase()} className="identicon" {...props} />
  );
}

export default Blockie;
