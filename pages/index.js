import SearchContext from "../utils/search-context";
import MenuItem from "../components/MenuItem";

import { useContext, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { makeStyles, Snackbar } from "@material-ui/core";
import { PinDropSharp, Translate } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import CartContext from "../utils/cart-context";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "underline",
    '&:hover': { cursor: "pointer" }
  }
}))

export default function Home() {
  const classes = useStyles()
  const { filteredMenu } = useContext(SearchContext);

  const [alert, setAlert] = useState(false)
  const [item, setItem] = useState(null)


  const openAlert = (item) => {
    setItem(item)
    setAlert(true)
    console.log(item.quantity, typeof item.quantity)
  }

  const closeAlert = () => {
    setAlert(false)
    setItem(null)
  }

  return (
    <div>
      <Head>
        <title>Thai Pavilion</title>
        <meta name="description" content="Thai Pavilion order system." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#f9f2fe" />
      </Head>
      <div style={{ margin: "0 auto", maxWidth: 1200 }}>
        <Snackbar open={alert} autoHideDuration={6000} onClose={closeAlert}>
          <Alert severity="success" onClose={closeAlert} iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}>
            {`${item ? item.name : ""} ${item ? item.quantity > 1 ? `(${item.quantity})` : "" : ""} added to `}<Link href="/cart"><strong className={classes.link}>cart</strong></Link>!
          </Alert>
        </Snackbar>
        <div
          style={{
            padding: 30,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(auto-fill, 1fr)",
            gridGap: 20,
          }}
        >
          {filteredMenu.map((item) => {
            return <MenuItem key={item.name} item={item} openAlert={openAlert} />
          })}
        </div>
      </div>
    </div>
  );
}
