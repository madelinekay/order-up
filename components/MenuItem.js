import { useMemo, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { useFormik } from "formik";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, FormControl, TextField } from "@material-ui/core";
import CartContext from "../utils/cart-context";
import { useContext } from "react";
import StarIcon from "@material-ui/icons/Star";
import NotesIcon from "@material-ui/icons/Notes";

import data from "../utils/data";

const useStyles = makeStyles(() => ({
  menuItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  proteins: {
    overflow: "auto",
    display: "block",
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
    marginBottom: 10,
    "& label": {
      width: "50%",
      float: "left",
      marginLeft: -11,
      marginRight: 11,
    },
  },
  otherOptions: {
    display: "flex",
  },
  rice: {
    flex: 1,
  },
  extras: {
    flex: 1,
  },
}));

const MenuItem = (props) => {
  const [notes, setNotes] = useState();

  const { options = [], name, price } = props.item;
  // const { category } = props;
  const classes = useStyles();
  // console.log("MenuItem item", props.item);
  const { addItem } = useContext(CartContext);

  const category = useMemo(() => {
    return (
      props.category ||
      Object.keys(data).find((cat) =>
        data[cat].find((item) => item.name === name)
      )
    );
  }, [props.category, name]);

  const groupedOptions = options.reduce((acc, option) => {
    return {
      ...acc,
      [option.type]: (acc[option.type] || []).concat(option),
    };
  }, {});

  const flattenedOptions = Object.values(groupedOptions).reduce(
    (acc, nested) => [...acc, ...nested],
    []
  );
  const handleStars = (event) => {
    console.log("handle stars", event);
  };

  const formik = useFormik({
    initialValues: {
      protein: "",
      rice: "",
      extras: [],
      notes: "",
      stars: 0,
    },

    onSubmit: async (values) => {
      const { protein, rice, extras = [], notes, stars } = values;

      let ricePrice = 0;
      if (rice.length > 0) {
        ricePrice = flattenedOptions.find(
          (item) => item.name === rice
        ).modifier;
      }
      let proteinPrice = 0;
      if (protein.length > 0) {
        proteinPrice = flattenedOptions.find(
          (item) => item.name === protein
        ).modifier;
      }

      let extraPrice = extras.reduce(
        (acc, extra) =>
          (acc += flattenedOptions.find(
            (item) => item.name === extra
          ).modifier),
        0
      );

      const itemPrice = price + ricePrice + proteinPrice + extraPrice;

      const cartItem = {
        name,
        protein,
        rice,
        extras,
        notes,
        stars,
        itemPrice,
      };

      addItem(cartItem);
    },
  });

  const handleStarsChanged = (starCount) => {
    formik.setFieldValue("stars", starCount);
  };

  return (
    <Card className={classes.menuItem}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader title={name} />
        <IconButton onClick={() => setNotes(true)}>
          <NotesIcon />
        </IconButton>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <CardContent>
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
          </CardContent>
          <CardActions>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                          <StarIcon />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    ))
                  : null}
              </div>
              <IconButton
                onClick={formik.handleSubmit}
                style={{ color: "blue" }}
              >
                <AddIcon size="medium" />
              </IconButton>
            </div>
          </CardActions>
        </FormControl>
      </form>
    </Card>
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
