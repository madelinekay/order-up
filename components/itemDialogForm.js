import React, { useState } from "react";
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import { useFormik } from "formik";
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

import CloseIcon from "@material-ui/icons/Close";
import {
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
import theme from "../pages/theme";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => ({
    menuItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    proteins: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        height: 150,
        width: 400,
    },
    icons: {
        color: theme.palette.primary.dark,
    },
    chip: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.dark}`,
    },
    button: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.dark}`,
    },
    textField: { width: "90%" },
    search: {
        flex: 1,
        marginLeft: 60,
        marginRight: 140,
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.primary.light,
        "&:hover": {
            backgroundColor: "#fdf4ff",
        },
    },
}));

// const defaultItem = { options = [], protein = "", rice = "", extras =[], stars = 0, quantity = 1 }

const ItemDialogForm = (props) => {
    const [notes, setNotes] = useState();

    const itemDefaults = {
        protein: "",
        rice: "",
        extras: [],
        notes: "",
        stars: 0,
        quantity: 1,
    }
    const item = { ...itemDefaults, ...props.item }
    const { options = [], name, price, category, time } = item; //these may not be in item, and if they are, some fields may not exist 
    const classes = useStyles();
    const { addItem } = useContext(CartContext);

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

    let rawSchema = {};

    if (groupedOptions.rice) {
        rawSchema.rice = yup.string().required("Choice of rice is required");
    }
    if (groupedOptions.protein) {
        rawSchema.protein = yup.string().required("Choice of protein is required");
    }

    const validationSchema = yup.object(rawSchema);

    const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
        useFormik({
            initialValues: item,
            validationSchema,
            validateOnBlur: false,
            validateOnChange: false,

            onSubmit: async (values) => {
                const { protein, rice, extras = [], notes, stars, quantity } = values;

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
                    category,
                    protein,
                    rice,
                    extras,
                    notes,
                    stars,
                    price,
                    itemPrice,
                    time,
                    quantity,
                    options,
                    id: name + Date.now()
                };

                props.onAdd(cartItem, item);
                props.onClose();
            },
        });

    const handleStarsChanged = (starCount) => {
        setFieldValue("stars", starCount);
    };

    return (
        <>
            <Dialog
                open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title"
                style={{ margin: "auto", width: 550 }}
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <DialogTitle>{name}</DialogTitle>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        {groupedOptions.protein ? (
                            <FormControl error={!!errors.protein}>
                                {errors.protein ? (
                                    <FormHelperText>{errors.protein}</FormHelperText>
                                ) : null}
                                <RadioGroup
                                    className={classes.proteins}
                                >
                                    {groupedOptions.protein.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={option.name}
                                            control={<Radio />}
                                            label={option.name}
                                            name="protein"
                                            checked={option.name === values.protein}
                                            onChange={handleChange}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        ) : null}

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {groupedOptions.rice ? (
                                <FormControl error={!!errors.rice}>
                                    {errors.rice ? (
                                        <FormHelperText>{errors.rice}</FormHelperText>
                                    ) : null}
                                    <RadioGroup
                                        className={classes.rice}
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            columnGap: 26,
                                        }}
                                    >
                                        {groupedOptions.rice.map((option, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={option.name}
                                                control={<Radio />}
                                                label={option.name}
                                                name="rice"
                                                onChange={handleChange}
                                                checked={option.name === values.rice}

                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            ) : null}

                            {groupedOptions.extras ? (
                                <FormControl>
                                    <FormGroup
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            columnGap: 38,
                                        }}
                                    >
                                        {groupedOptions.extras.map((option, index) => (

                                            <FormControlLabel
                                                key={index}
                                                control={<Checkbox />}
                                                value={option.name}
                                                label={option.name}
                                                checked={values.extras.includes(option.name)}

                                                name="extras"
                                                onClick={() => {
                                                    if (values.extras.includes(option.name)) {
                                                        setFieldValue(
                                                            "extras",
                                                            values.extras.filter((n) => n !== option.name)
                                                        );
                                                    } else {
                                                        setFieldValue("extras", [
                                                            ...values.extras,
                                                            option.name,
                                                        ]);
                                                    }
                                                }}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                            ) : null}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 30,
                            }}
                        >
                            <div>
                                {notes ? (
                                    <FormControl>
                                        <TextField
                                            InputProps={{ disableUnderline: true }}
                                            style={{ width: "100%" }}
                                            size="small"
                                            id="notes"
                                            name="notes"
                                            placeholder="add notes"
                                            value={values.notes}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                ) : (
                                    <Button
                                        style={{ marginRight: 20 }}
                                        onClick={() => setNotes(true)}
                                    >
                                        <div style={{ marginRight: 30 }}>Add notes</div>
                                        <ExpandMoreIcon />
                                    </Button>
                                )}
                            </div>

                            <>
                                <label
                                    htmlFor="quantity"
                                    style={{ marginTop: 5, marginRight: 5 }}
                                >
                                    Quantity:
                                </label>
                                <TextField
                                    value={values.quantity}
                                    onChange={handleChange}
                                    placeholder="1"
                                    type="number"
                                    min="0"
                                    max="50"
                                    style={{ width: "10%" }}
                                    id="quantity"
                                    InputProps={{ disableUnderline: true }}
                                />
                            </>
                        </div>
                    </DialogContent>
                    <DialogActions
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <>

                            <div>
                                {category !== "appetizers" &&
                                    category !== "sides" &&
                                    category !== "desserts" &&
                                    category !== "drinks" ? (
                                    [1, 2, 3, 4, 5].map((count) => (
                                        <IconButton
                                            key={count}
                                            onClick={() => handleStarsChanged(count)}
                                        >
                                            {count <= values.stars ? (
                                                <StarIcon style={{ color: "#ffc500" }} />
                                            ) : (
                                                <StarBorderIcon style={{ color: "#ffc500" }} />
                                            )}
                                        </IconButton>
                                    ))
                                ) : (
                                    <div style={{ width: 22 - 5 }}></div>
                                )}

                            </div>

                            <Button onClick={handleSubmit} className={classes.chip}>
                                Add to cart
                            </Button>
                        </>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}

export default ItemDialogForm;