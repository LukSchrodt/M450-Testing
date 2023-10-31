import React, {useState} from 'react';
import {MyListEntry} from "../../../types/models/MyListEntry.model";
import * as yup from "yup";
import {Box, Button, Dialog, DialogActions, Grid, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import PostService from "../../../Services/PostService";
import {FormikTextField} from "../../atoms/formikTextFields/FormikTextField";
import NormalButton from "../../atoms/buttons/normalbutton/NormalButton";

/**
 * This is a Popop, which is displayed, if u click the Edit Button on a Postcard
 * On this Popup you can edit a Post
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
    post: MyListEntry;
    renderPostList: Function;
}

export default function UpdatePostCard({post, renderPostList}: Props){
    const [openPopUp, setOpenPopUp] = useState(false);
    const handleClose = () => {
        setOpenPopUp(false);
    };
    const [value, setValue] = useState(post.priority);
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
                                <Typography sx={{fontSize: 28, fontWeight: "bold"}}>Edit Post</Typography>
                            </Grid>
                            <Formik
                                initialValues={{
                                    title: post.title,
                                    text: post.text,
                                    priority: value,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
                                    PostService.updatePost(post.id, values).then((response)=> {
                                            renderPostList();
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
                                            Save Changes
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
    )
}