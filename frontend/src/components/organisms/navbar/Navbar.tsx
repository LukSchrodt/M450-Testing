import React, {useContext} from 'react';
import {AppBar, Box, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import LogoutIcon from '@mui/icons-material/Logout';
import UserInfoCard from "../../molecules/userInfoCard/UserInfoCard";

/**
 * Appbar with Title, Filter Selecter and Logout
 */

export default function Navbar(){
    const { logout } = useContext(ActiveUserContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    }

    const handleMyAccount = () => {
        handleClose();
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{minHeight: "54px"}}>
                <Toolbar variant="dense">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Noser Blog
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{height: 20, width: 20}}
                        >
                            <AccountCircleIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <UserInfoCard closeList={handleMyAccount}/>
                            <MenuItem onClick={handleLogout}><LogoutIcon/>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}