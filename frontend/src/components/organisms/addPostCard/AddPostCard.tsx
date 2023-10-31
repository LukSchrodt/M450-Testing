import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, Grid,Typography} from '@mui/material';
import {Field, Form, Formik, FormikHelpers, FormikProps} from 'formik';
import * as yup from 'yup';
import FloatingActionButton from '../../atoms/buttons/fab/FloatingActionButton';
import {FormikTextField} from "../../atoms/formikTextFields/FormikTextField";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import PostService from "../../../Services/PostService";

/**
 * Pop Up to create a new Post
 */

interface FormValues {
    title: string;
    text: string;
    priority: string;
}

const validationSchema = yup.object().shape({
    title: yup.string().required("Please Enter a Title"),
    text: yup.string().required("Please Enter a Text"),
    priority: yup.string().required("Please choose a Priority"),
});

type Props = {
    setPostList : Function;
    allPosts: boolean;
}

export default function AddPostCard({setPostList, allPosts}: Props){
    const [openPopUp, setOpenPopUp] = useState(false);
    const handleClose = () => {
        setOpenPopUp(false);
    };
    const [value, setValue] = useState('LOW');
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
                                <Typography sx={{fontSize: 28, fontWeight: "bold"}}>Create new Post</Typography>
                            </Grid>
                            <Formik
                                initialValues={{
                                    title: '',
                                    text: '',
                                    priority: value,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
                                    PostService.createPost(values).then((response)=> {
                                        if(allPosts === true){
                                            PostService.getAllPostsSorted().then((response) => {
                                                setPostList(response);
                                            })
                                        }else{
                                            PostService.getAllPosts().then((response) => {
                                                setPostList(response);
                                            })
                                        }
                                    });
                                    formikHelpers.setSubmitting(false);
                                    setOpenPopUp(false);
                                }}
                            >
                                {(formikProps: FormikProps<FormValues>) => (
                                    <Form noValidate autoComplete="off">
                                        <Field name="title" label="title" component={FormikTextField} />
                                        <Field name="text" label="text" component={FormikTextField} />
                                        <div role="group">
                                            <label>
                                                <Field type="radio" name="priority" value="HIGH"/>
                                                HIGH
                                            </label>
                                            <label>
                                                <Field type="radio" name="priority" value="MEDIUM"/>
                                                MEDIUM
                                            </label>
                                            <label>
                                                <Field type="radio" name="priority" value="LOW"/>
                                                LOW
                                            </label>
                                        </div>
                                        <Button type="submit" disabled={formikProps.isSubmitting} variant="contained" sx={{ml: "15%", width: "70%", mr: "15%", mt: 5}}>
                                            Save Post
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Grid>
                    </Box>
                </DialogActions>
            </Dialog>
            <FloatingActionButton icon="Add" text="Create post" onClick={() => {setOpenPopUp(true);}}/>
        </div>
    )
}