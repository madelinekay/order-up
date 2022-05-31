
import SearchContext from "../utils/search-context";
import CartContext from "../utils/cart-context";

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import {
  IconButton,
  AppBar,
  Toolbar,
  makeStyles,
  TextField,
  InputAdornment,
  Typography,
  Tooltip,
  Badge
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary.light,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
  },
  search: {
    width: 300,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    color: theme.palette.primary.dark,
  },
  inputRoot: {
    color: theme.palette.primary.dark
  },
}));

const MainNavigation = () => {
  const { search, searchQuery } = useContext(SearchContext);
  const { cart, orders } = useContext(CartContext)
  const classes = useStyles();
  const router = useRouter()

  const ongoingOrders = orders.filter(order => order.status == "ongoing")

  const routeToMenu = () => {
    const location = router.asPath
    console.log("location", location)

    if (location == "/orders" || location == "/cart") {
      router.push("/")
    }
  }

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>
          <Link href="/">
            Order Up | Thai Pavilion
          </Link>
        </Typography>
        <div className={classes.search}>
          <TextField
            placeholder="Search menu"
            onClick={routeToMenu}
            onChange={search}
            value={searchQuery}
            classes={{
              root: classes.inputRoot,
            }}
            fullWidth
            InputProps={{
              "aria-label": "search",
              startAdornment: (
                <InputAdornment position="start" style={{ marginLeft: 15 }}>
                  <SearchIcon className={classes.searchIcon} />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 150,
          }}
        >
          <Link href="/">
            <Tooltip title="menu">
              <IconButton color="inherit">
                <HomeIcon />
              </IconButton>
            </Tooltip>
          </Link>
          <Link href="/cart">
            <Tooltip title="cart">
              <IconButton color="inherit">
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
          <Link href="/orders">
            <Tooltip title="orders">
              <IconButton color="inherit">
                <Badge badgeContent={ongoingOrders.length} color="secondary">
                  <RestaurantMenuIcon id="basic-button" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
