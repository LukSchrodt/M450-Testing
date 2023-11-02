import React, {useContext, useEffect, useState} from 'react';
import { Box} from '@mui/material';
import PageStyles from "../PageStyles";
import Navbar from "../../organisms/navbar/Navbar";
import UserList from '../../organisms/userList/UserList';
import UserService from '../../../Services/UserService';
import { User } from '../../../types/models/User.model';
import BottomBar from '../../molecules/bottombar/BottomBar';
import { useNavigate } from 'react-router-dom';
import AddUserCard from "../../organisms/addUserCard/AddUserCard";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import HomePage from "../HomePage";


/**
 * List with all Users, is only enable for a Admin
 */


export default function UserListPage(){
    const [list, setList] = useState<User[]>([]);
    useEffect(() => {
        UserService.getAllUsers().then((response) => {
            setList(response);
        })
    }, []);

    const navigate = useNavigate();
    const defaultNavigate = () => {
    }
    const allPost = () => {
        navigate("/adminhome");
    }
    const allUser = () => {
        navigate("/users");
    }
    const userPosts = () => {
        navigate("/mylist");
    }
    const { checkRole } = useContext(ActiveUserContext);
    const text = ["All Post", "Your Posts", "recent", "help", "all users"];
    return (
        <div>
            {checkRole("ADMIN") === true ? (
                <Box sx={PageStyles.homepage}>
                    <Navbar/>
                    <BottomBar text={text} icon={["Forum", "ChatBubble", "Restore", "Help", "Group"]} onClick={[allPost, userPosts, defaultNavigate, defaultNavigate, allUser]}/>
                    <UserList users={list} setUserList={setList}/>
                    <AddUserCard setUserList={setList}/>
                </Box>
            ): (
                <HomePage/>
            )}
        </div>
    );
}