import { useState } from "react";
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import { Field, useFormik } from "formik";
import { FormHelperText } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, FormControl, TextField, Dialog } from "@material-ui/core";
import CartContext from "../utils/cart-context";
import { useContext } from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import NotesIcon from "@material-ui/icons/Notes";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import {
  Button,
  Chip,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import theme from "../pages/theme";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { date } from "yup/lib/locale";
import ItemDialogForm from "./itemDialogForm";


const useStyles = makeStyles(() => ({
  button: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const MenuItem = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);


  const openModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ItemDialogForm open={open}
        onClose={handleClose} item={props.item}
        style={{ margin: "auto", width: 550 }} />

      <Button className={classes.button} onClick={openModal}>
        <h2>{props.item.name}</h2>
      </Button>
    </>
  );
};

export default MenuItem;

// const optionGroupOutput = {
//   rice: [
//     { name: "White rice", type: "rice", modifier: 0 },
//     { name: "Brown rice", type: "rice", modifier: 1 },
//   ],
//   extras: [{ name: "Extra meat", type: "extras", modifier: 2 }],
// };
