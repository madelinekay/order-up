import { useMemo } from "react";
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
import { makeStyles } from "@material-ui/core";

import data from "../utils/data";

const useStyles = makeStyles(() => ({
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
  const { options = [], name } = props.item;
  // const { category } = props;
  const classes = useStyles();
  // console.log("MenuItem item", props.item);

  const category = useMemo(() => {
    return (
      props.category ||
      Object.keys(data).find((cat) =>
        data[cat].find((item) => item.name === name)
      )
    );
  }, [props.category, name]);

  const formik = useFormik({
    initialValues: {
      protein: null,
      rice: null,
      extras: null,
      notes: "",
      stars: 1,
    },

    onSubmit: async (values) => {
      const { protein, rice, extras, notes, stars } = values;
      const data = {
        protein,
        rice,
        extras,
        notes,
        stars,
      };
    },
  });

  const groupedOptions = options.reduce((acc, option) => {
    return {
      ...acc,
      [option.type]: (acc[option.type] || []).concat(option),
    };
  }, {});

  return (
    <Card>
      <CardHeader title={name} />
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          {groupedOptions.protein ? (
            <RadioGroup className={classes.proteins}>
              {groupedOptions.protein.map((value) => (
                <FormControlLabel
                  key={value.name}
                  value={value.name}
                  control={<Radio />}
                  label={value.name}
                />
              ))}
            </RadioGroup>
          ) : null}

          <div className={classes.otherOptions}>
            {groupedOptions.rice ? (
              <RadioGroup className={classes.rice}>
                {groupedOptions.rice.map((value) => (
                  <FormControlLabel
                    key={value.name}
                    value={value.name}
                    control={<Radio />}
                    label={value.name}
                  />
                ))}
              </RadioGroup>
            ) : null}

            {groupedOptions.extras ? (
              <FormGroup className={classes.extras}>
                {groupedOptions.extras.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    value={value.name}
                    label={value.name}
                  />
                ))}
              </FormGroup>
            ) : null}
          </div>
        </CardContent>
        <CardActions style={{ display: "flex", alignItems: "flex-end" }}>
          <IconButton>
            <AddIcon />
          </IconButton>
          {category !== "appetizers" &&
          category !== "sides" &&
          category !== "desserts" &&
          category !== "drinks" ? (
            <>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
              <IconButton>
                <StarBorderIcon />
              </IconButton>
            </>
          ) : null}
        </CardActions>
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
