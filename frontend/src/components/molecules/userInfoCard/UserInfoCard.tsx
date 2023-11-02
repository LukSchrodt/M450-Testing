import React, {useState} from 'react';
import {User} from "../../../types/models/User.model";
import {Box, Dialog, DialogActions, Grid, MenuItem, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

/**
 * Pop up which displays the information of the current user
 * This component is Displayed, if u click the account Icon in the Navbar and then the "My Account" Button
 */
type Props = {
    closeList: Function;
}

export default function UserInfoCard({closeList}: Props){
    const user : User = JSON.parse(localStorage.getItem('user') || '{}');
    const [openPopUp, setOpenPopUp] = useState(false);
    const handleClose = () => {
        setOpenPopUp(false);
        closeList();
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
                            <Grid xs={9} md={9} lg={9} sx={{textAlign: "left", mb:3}}>
                                <Typography sx={{fontSize: 28, fontWeight: "bold"}}>User Info</Typography>
                            </Grid>
                            <Grid xs={3} md={3} lg={3} sx={{textAlign: "left"}}>
                                <Typography sx={{fontSize: 20 , color: "#5e5e5e"}}>Firstname:</Typography>
                            </Grid>
                            <Grid xs={3} md={3} lg={3} sx={{textAlign: "left"}}>
                                <Typography sx={{fontSize: 20 }}>{user.firstName}</Typography>
                            </Grid>
                            <Grid xs={3} md={3} lg={3} sx={{textAlign: "left"}}>
                                <Typography sx={{fontSize: 20 , color: "#5e5e5e"}}>Lastname:</Typography>
                            </Grid>
                            <Grid xs={3} md={3} lg={3} sx={{textAlign: "left"}}>
                                <Typography sx={{fontSize: 20 }}>{user.lastName}</Typography>
                            </Grid>
                            <Grid xs={3} md={3} lg={3} sx={{textAlign: "left", mt: 2}}>
                                <Typography sx={{fontSize: 20 , color: "#5e5e5e"}}>Email:</Typography>
                            </Grid>
                            <Grid xs={9} md={9} lg={9} sx={{textAlign: "left", mb:2, mt:2}}>
                                <Typography sx={{fontSize: 20 }}>{user.email}</Typography>
                            </Grid>
                            <Grid xs={3} md={3} lg={3} sx={{textAlign: "left"}}>
                                <Typography sx={{fontSize: 20 , color: "#5e5e5e"}}>Password:</Typography>
                            </Grid>
                            <Grid xs={9} md={9} lg={9} sx={{textAlign: "left"}}>
                                <Typography sx={{fontSize: 20 }}>*********</Typography>
                            </Grid>
                        </Grid>
                        </Box>
                </DialogActions>
            </Dialog>
            <MenuItem onClick={() => setOpenPopUp(true)}><ManageAccountsIcon/>My Account</MenuItem>

        </div>
    )
}