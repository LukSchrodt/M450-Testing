import React from 'react';
import { FieldProps, getIn } from "formik";
import TextField, { TextFieldProps } from "@mui/material/TextField";

/**
 * Text field with Formik, is used to create new users or posts
 */

export const FormikTextField: React.FC<FieldProps & TextFieldProps> = (props) => {
    const isTouched = getIn(props.form.touched, props.field.name);
    const errorMessage = getIn(props.form.errors, props.field.name);
    const { error, helperText, field, form, ...rest } = props;
    return (
        <TextField
            variant="filled"
            error={error ?? Boolean(isTouched && errorMessage)}
            helperText={helperText ?? (isTouched && errorMessage ? errorMessage : null)}
            {...rest}
            {...field}
            sx={{ mt: 3, width: "85%", ml: "7.5%", mr: "7.5%" }}
        />
    );
};
