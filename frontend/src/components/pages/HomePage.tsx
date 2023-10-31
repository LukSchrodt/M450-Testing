import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../organisms/navbar/Navbar";
import AllPostList from "../organisms/postLists/AllPostList";
import PageStyles from "./PageStyles";
import {Box} from "@mui/material";
import BottomBar from '../molecules/bottombar/BottomBar';
import { useNavigate } from 'react-router-dom';
import {MyListEntry} from "../../types/models/MyListEntry.model";
import PostService from "../../Services/PostService";
import AddPostCard from "../organisms/addPostCard/AddPostCard";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import AdminHomePage from "./AdminHomePage";


export default function HomePage() {
    const [posts, setPosts] = useState<MyListEntry[]>([]);
    useEffect(() => {
        PostService.getAllPostsSorted().then((response) => {
            setPosts(response);
            navigate('/home');
        })
    }, []);
    const text = ["All Post", "Your Posts", "recent", "help"];
    const navigate = useNavigate();
    const defaultNavigate = () => {
        console.log("hey");
    }
    const allPost = () => {
        navigate("/home");
    }
    const userPosts = () => {
        navigate("/mylist");
    }
    const { checkRole } = useContext(ActiveUserContext);
    return (
        <div>
            {checkRole("ADMIN") === true ? (
                <AdminHomePage/>
            ): (
                <Box sx={PageStyles.homepage}>
                    <Navbar/>
                    <BottomBar text={text} icon={["Forum", "ChatBubble", "Restore", "Help", "Group"]} onClick={[allPost, userPosts, defaultNavigate, defaultNavigate]}/>
                    <AllPostList posts={posts} setPostList={setPosts}/>
                    <AddPostCard setPostList={setPosts} allPosts={true}/>
                </Box>
            )}
        </div>
    );
}
