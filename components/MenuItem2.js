import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const MenuItem = (props) => {
  const { name } = props.item;

  const classes = useStyles();

  return (
    <Button className={classes.button}>
      <h2>{name}</h2>
    </Button>
  );
};

export default MenuItem;
