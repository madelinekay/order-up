import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  TextField,
  InputAdornment,

} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import SearchIcon from "@material-ui/icons/Search";
import { categories } from "../utils/data";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchContext from "../utils/search-context";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  menu: {
    display: "flex",
  },
  title: {
    color: "#70008e",
    fontWeight: "bold",
  },

  search: {
    width: 300,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: "#fdf4ff",
    },
  },
  searchIcon: {
    color: theme.palette.primary.dark,
  },

  inputRoot: {
    color: "d128ff",
  },
  inputInput: {
    backgroundColor: "#d128ff",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
        <Link href="/">
          <div className={classes.title}> Order Up | Thai Pavillion</div>
        </Link>
        <div className={classes.search}>
          <TextField
            placeholder="Search…"
            name="s"
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
            <HomeIcon />
          </Link>


          <div className={classes.menu}>

            <RestaurantMenuIcon
              color="inherit"
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />


            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {categories.map((category) => (
                <Link href={"/" + category} key={category}>
                  <MenuItem onClick={handleClose}>{category}</MenuItem>
                </Link>
              ))}
            </Menu>
          </div>


          <Link href={"/cart"}>
            <ShoppingCartIcon />
          </Link>

          <Link href={"/orders"}>
            <MenuIcon />
          </Link>

        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
