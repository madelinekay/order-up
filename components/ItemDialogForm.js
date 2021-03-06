import theme from "../styles/theme";

import React, { useState } from "react";
import * as yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from "formik";
import { FormHelperText } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, FormControl, TextField, Dialog } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import CloseIcon from "@material-ui/icons/Close";
import {
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(() => ({
    proteins: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        height: 150,
        width: 400,
    },
    proteinForm: { borderBottom: `solid ${theme.palette.ternary.dark} ` }
}));

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
    const { options = [], name, price, category, time } = item;
    const classes = useStyles();

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

    const { values, errors, setFieldValue, handleChange, handleSubmit } =
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
                props.openAlert(cartItem);
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
                            <FormControl error={!!errors.protein} className={classes.proteinForm}>
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
                                            control={<Radio color="primary" />}
                                            label={option.name}
                                            name="protein"
                                            checked={option.name === values.protein}
                                            onChange={handleChange}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        ) : null}

                        <div style={{ display: "flex", flexDirection: "column", marginTop: 25 }}>
                            {groupedOptions.rice ? (
                                <FormControl error={!!errors.rice}>
                                    {errors.rice ? (
                                        <FormHelperText>{errors.rice}</FormHelperText>
                                    ) : null}
                                    <RadioGroup

                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 12,

                                        }}
                                    >
                                        {groupedOptions.rice.map((option, index) => (
                                            <FormControlLabel

                                                key={index}
                                                value={option.name}
                                                control={<Radio color="primary" />}
                                                label={`${option.name} rice`}
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
                                                control={<Checkbox color="primary" />}
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
                                {category !== "Appetizers" &&
                                    category !== "Sides" &&
                                    category !== "Desserts" &&
                                    category !== "Drinks" ? (
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

                            <Button variant='contained' color='primary' onClick={handleSubmit} startIcon={<AddIcon />} disableElevation >
                                Add to Cart
                            </Button>
                        </>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}

export default ItemDialogForm;