import React, {useState } from 'react';
import {Box, Button, Dialog, DialogActions, Grid, Typography} from '@mui/material';
import UserService from '../../../Services/UserService';
import {Field, Form, Formik, FormikHelpers, FormikProps} from 'formik';
import * as yup from 'yup';
import FloatingActionButton from '../../atoms/buttons/fab/FloatingActionButton';
import {FormikTextField} from "../../atoms/formikTextFields/FormikTextField";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

/**
 * Pop Up to create a new User
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
    setUserList : Function;
}


export default function AddUserCard({setUserList}:Props){
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
                            <Typography sx={{fontSize: 28, fontWeight: "bold"}}>Create new User</Typography>
                            </Grid>
                            <Formik
                                initialValues={{
                                    firstname: '',
                                    lastname: '',
                                    email: '',
                                    password: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
                                    UserService.addUser(values).then((response) => {
                                        UserService.getAllUsers().then((response) => {
                                            setUserList(response);
                                        })
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
            <FloatingActionButton icon="Add" text="Add User" onClick={() => {setOpenPopUp(true);}}/>
        </div>
    );
}