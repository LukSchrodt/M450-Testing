import React, {useEffect, useState } from 'react';
import ListStyles from './ListStyles';
import './List.css';
import { User } from '../../../types/models/User.model';
import {Grid } from '@mui/material';
import UserCard from '../../molecules/usercard/UserCard';
import PostService from "../../../Services/PostService";
import UserService from "../../../Services/UserService";

/**
 * List with all Users
 */

type Props = {
    users:User[];
    setUserList: Function;
}

export default function UserList({users, setUserList}: Props){
    const [list, setList] = useState<User[]>([]);
    useEffect(() => {
        setList(users);
    }, [users]);

    const renderUserList = () => {
        UserService.getAllUsers().then((response)=> {
            setUserList(response);
        })
    }

    return(
        <div className="list">
        <Grid container spacing={{ xs: 3, md: 3 }} sx={ListStyles.list}>
            {list.map((user : User) => (
                <Grid xs={3} md={3} lg={3} sx={{mt:2}}>
                    <UserCard user={user} setUserList={renderUserList}/>
                    </Grid>
            ))}
        </Grid>
        </div>
    )

}