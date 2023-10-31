import {Avatar, Card, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { User } from '../../../types/models/User.model';
import NormalButton from '../../atoms/buttons/normalbutton/NormalButton';
import UserService from "../../../Services/UserService";
import UpdatePostCard from "../../organisms/updatePostCard/UpdatePostCard";
import UpdateUserCard from "../../organisms/updateUserCard/UpdateUserCard";

/**
 * Usercard, the user details are Displayed and you can change them
 */

type Props = {
    user: User;
    setUserList: Function;
}

export default function UserCard({user, setUserList}: Props){
    const fullname : string = user.firstName + ' ' + user.lastName;

    const deleteUser = () => {
        UserService.deleteUser(user.id).then((response) => {
            setUserList();
        }).catch((error) => {
            console.log(error);
        });
    }


    return(
        <Card sx={{width: "95%"}}>
            <Grid container alignItems="center">
                <Grid xs={4} md={4} lg={4}>
                    <></>
                </Grid>
                <Grid xs={4} md={4} lg={4} sx={{itemAlign: "center"}}>
                   <Avatar {...stringAvatar(fullname)} sx={{ml: 5, mt: 1, fontSize: 22}}/>
                </Grid>
                <Grid xs={4} md={4} lg={4}>
                    <></>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{mt: 4}}>
                    <Typography variant="body2" sx={{ml: 1, fontSize: 15}}>Firstname: </Typography>
                    <Typography variant="body1" sx={{ml: 1}}>{user.firstName}</Typography>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{mt: 4}}>
                    <Typography variant="body2" sx={{fontSize: 15}}>Lastname: </Typography>
                    <Typography>{user.lastName}</Typography>
                </Grid>
                <Grid xs={12} md={12} lg={12} sx={{mt:2}}>
                    <Typography variant="body2" sx={{ml: 1, fontSize: 15}}>Email-Adress: </Typography>
                    <Typography variant="body1" sx={{ml: 1}}>{user.email}</Typography>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{mt:7, mb: 3}}>
                    <UpdateUserCard user={user} upDateUserList={setUserList}/>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{mt:7, mb: 3}}>
                    <NormalButton text="Delete" sx={{bgcolor: "#a67f32", mr: 5}} onClick={deleteUser}/>
                </Grid>
            </Grid>

        </Card>
    )
}

/**
 * Function to create UserAvatar
 */

function stringAvatar(name : string){
    return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}