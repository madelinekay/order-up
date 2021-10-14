import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import NotesIcon from "@material-ui/icons/Notes";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  TextField,
} from "@material-ui/core";

const ItemModal = (props) => {
  const [notes, setNotes] = useState();
  const { options = [], name, price } = props.item;
  const classes = useStyles();
  const { addItem } = useContext(CartContext);

  return (
    <Dialog>
      <div>
        <DialogTitle>{name}</DialogTitle>
        <IconButton onClick={() => setNotes(true)}>
          <NotesIcon />
        </IconButton>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <DialogContent>
            {groupedOptions.protein ? (
              <RadioGroup className={classes.proteins}>
                {groupedOptions.protein.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.name}
                    control={<Radio />}
                    label={option.name}
                    name="protein"
                    onChange={formik.handleChange}
                  />
                ))}
              </RadioGroup>
            ) : null}

            <div className={classes.otherOptions}>
              {groupedOptions.rice ? (
                <RadioGroup className={classes.rice}>
                  {groupedOptions.rice.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option.name}
                      control={<Radio />}
                      label={option.name}
                      name="rice"
                      onChange={formik.handleChange}
                    />
                  ))}
                </RadioGroup>
              ) : null}

              {groupedOptions.extras ? (
                <FormGroup className={classes.extras}>
                  {groupedOptions.extras.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      value={option.name}
                      label={option.name}
                      name="extras"
                      onClick={formik.handleChange}
                    />
                  ))}
                </FormGroup>
              ) : null}
            </div>
            {notes ? (
              <TextField
                style={{ width: "100%" }}
                variant="filled"
                size="small"
                id="notes"
                name="notes"
                placeholder="add notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <div style={{ display: "flex" }}>
              <div>
                {category !== "appetizers" &&
                category !== "sides" &&
                category !== "desserts" &&
                category !== "drinks"
                  ? [1, 2, 3, 4, 5].map((count) => (
                      <IconButton
                        key={count}
                        onClick={() => handleStarsChanged(count)}
                      >
                        {count <= formik.values.stars ? (
                          <StarIcon style={{ color: "#ffc500" }} />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    ))
                  : null}
              </div>
              {/* <IconButton
                onClick={formik.handleSubmit}
                style={{ color: "blue" }}
              >
                <AddIcon size="medium" className={classes.icons} />
              </IconButton> */}
              <Chip label="Add to cart" className={classes.chip} />
            </div>
          </DialogActions>
        </FormControl>
      </form>
    </Dialog>
  );
};

export default ItemModal;
