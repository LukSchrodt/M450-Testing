import React, {useState} from 'react';
import * as yup from "yup";
import {User} from "../../../types/models/User.model";
import {Box, Button, Dialog, DialogActions, Grid, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import UserService from "../../../Services/UserService";
import {FormikTextField} from "../../atoms/formikTextFields/FormikTextField";
import FloatingActionButton from "../../atoms/buttons/fab/FloatingActionButton";
import NormalButton from "../../atoms/buttons/normalbutton/NormalButton";

/**
 * This is a Popop, which is displayed, if u click the Edit Button on a Usercard
 * On this Popup you can edit a User
 */

interface FormValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const validationSchema = yup.object().shape({
    firstname: yup.string().required("Please Enter a Name"),
    lastname: yup.string().required("Please Enter a Name"),
    email: yup.string().required("Please enter a Email"),
    password: yup.string().required("Please Enter a Passowrd").min(6, "The Password must be at least 6 characters"),
});

type Props = {
    user: User;
    upDateUserList: Function;
}

export default function UpdateUserCard({user, upDateUserList}: Props){
    const [openPopUp, setOpenPopUp] = useState(false);
    const handleClose = () => {
        setOpenPopUp(false);
    };
    return(
        <div>
            <Dialog open={openPopUp} onClose={handleClose} sx={{ height: "100%",
                width: "100%",
                bgcolor: "transparent",
                alignItems: "center",}}>
                <DialogActions sx={{ maxWidth: 1000, maxHeight: 600}}>
                    <Box sx={{ overflowX: "hidden", width: "100%" }}>
                        <Grid container alignItems="center">
                            <Grid xs={3} md={3} lg={3} sx={{textAlign: "left"}}>
                                <IconButton onClick={() => setOpenPopUp(false)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                            <Grid xs={9} md={9} lg={9} sx={{textAlign: "left"}}>
                                <Typography sx={{fontSize: 28, fontWeight: "bold"}}>Edit User</Typography>
                            </Grid>
                            <Formik
                                initialValues={{
                                    firstname: user.firstName,
                                    lastname: user.lastName,
                                    email: user.email,
                                    password: ''
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
                                    UserService.updateUser(user.id, values).then((response) => {
                                            upDateUserList();
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                    formikHelpers.setSubmitting(false);
                                    setOpenPopUp(false);
                                }}
                            >
                                {(formikProps: FormikProps<FormValues>) => (
                                    <Form noValidate autoComplete="off">
                                        <Field name="firstname" label="firstname" component={FormikTextField} />
                                        <Field name="lastname" label="lastname" component={FormikTextField} />
                                        <Field name="email" label="email" component={FormikTextField} />
                                        <Field
                                            name="password"
                                            label="password"
                                            type="password"
                                            component={FormikTextField}
                                        />
                                        <Button type="submit" disabled={formikProps.isSubmitting} variant="contained" sx={{ml: "15%", width: "70%", mr: "15%", mt: 5}}>
                                            Save User
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Box>
                </DialogActions>
            </Dialog>
            <NormalButton text="Edit" sx={{bgcolor: "#81a632", ml: 13}} onClick={()=> setOpenPopUp(true)}/>
        </div>
    );
}