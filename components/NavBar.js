import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AppBar, Toolbar, makeStyles, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import data from "../utils/data";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchContext from "../utils/search-context";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "white",
    color: "black",
  },
  toolbar: {
    marginRight: theme.spacing(30),
    marginLeft: theme.spacing(30),
  },
  menu: {
    display: "flex",
  },
  title: {
    width: "50%",
  },
  navItem: {
    marginRight: theme.spacing(1),
  },
  search: {
    position: "relative",
    marginLeft: theme.spacing(20),
    width: "100%",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginLeft: theme.spacing(4),
  },
}));

const MainNavigation = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { search, searchQuery } = useContext(SearchContext);

  return (
    <AppBar position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>Thai Pavillion Calculator</div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.input}>
            <label
              htmlFor="header-search"
              style={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                whiteSpace: "nowrap",
                width: 1,
              }}
            >
              <span className="visually-hidden">Search blog posts</span>
            </label>
            <InputBase
              placeholder="search..."
              type="text"
              name="s"
              onChange={search}
              value={searchQuery}
            />
          </div>
        </div>

        <div className={classes.navItem}>
          <IconButton color="inherit">
            <Link href="/">
              <HomeIcon />
            </Link>
          </IconButton>
        </div>

        <div className={classes.menu}>
          <div className={classes.navItem}>
            <IconButton
              color="inherit"
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <RestaurantMenuIcon />
            </IconButton>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {Object.entries(data).map(([category]) => (
              <Link href={"/" + category} key={category}>
                <MenuItem onClick={handleClose}>{category}</MenuItem>
              </Link>
            ))}
          </Menu>
          <div className={classes.navItem}>
            <IconButton color="inherit">
              <Link href={"/cart"}>
                <ShoppingCartIcon />
              </Link>
            </IconButton>
          </div>
          <div className={classes.navItem}>
            <IconButton color="inherit">
              <Link href={"/orders"}>
                <MenuIcon />
              </Link>
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
