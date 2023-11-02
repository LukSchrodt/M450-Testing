import { Box } from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import AllPostList from "../organisms/postLists/AllPostList";
import PageStyles from "./PageStyles";
import Navbar from "../organisms/navbar/Navbar";
import BottomBar from '../molecules/bottombar/BottomBar';
import { useNavigate } from 'react-router-dom';
import AddPostCard from "../organisms/addPostCard/AddPostCard";
import {MyListEntry} from "../../types/models/MyListEntry.model";
import PostService from "../../Services/PostService";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import HomePage from "./HomePage";

/**
 * Home Page For Admins
 */

export default function AdminHomePage(){
    const [posts, setPosts] = useState<MyListEntry[]>([]);
    useEffect(() => {
        PostService.getAllPostsSorted().then((response) => {
            setPosts(response);
        })
    }, []);
    const text = ["All Post", "Your Posts", "recent", "help", "all users"];
    const navigate = useNavigate();
    const defaultNavigate = () => {
        console.log("hey");
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
    return (
        <div>
            {checkRole("USER") === true ? (
                <HomePage/>
            ): (
                <Box sx={PageStyles.homepage}>
                    <Navbar/>
                    <BottomBar text={text} icon={["Forum", "ChatBubble", "Restore", "Help", "Group"]} onClick={[allPost, userPosts, defaultNavigate, defaultNavigate, allUser]}/>
                    <AllPostList posts={posts} setPostList={setPosts}/>
                    <AddPostCard setPostList={setPosts} allPosts={true}/>
                </Box>
            )}
        </div>
    );
}