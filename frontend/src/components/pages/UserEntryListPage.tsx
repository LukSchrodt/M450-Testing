import React, {useContext, useEffect, useState} from "react";
import {MyListEntry} from "../../types/models/MyListEntry.model";
import PostService from "../../Services/PostService";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import PageStyles from "./PageStyles";
import Navbar from "../organisms/navbar/Navbar";
import BottomBar from "../molecules/bottombar/BottomBar";
import AddPostCard from "../organisms/addPostCard/AddPostCard";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import UserPostList from "../organisms/postLists/UserPostList";

export default function UserEntryListPage(){
    const { checkRole } = useContext(ActiveUserContext);
    const [posts, setPosts] = useState<MyListEntry[]>([]);
    useEffect(() => {
        PostService.getAllPosts().then((response) => {
            setPosts(response);
        })
    }, []);
    const text = ["All Post", "Your Posts", "recent", "help"];
    const textAdmin = ["All Post", "Your Posts", "recent", "help", "all users"];
    const navigate = useNavigate();
    const defaultNavigate = () => {
        console.log("hey");
    }
    const allPost = () => {
        navigate("/home");
    }
    const allPostAdmin = () => {
        navigate("/adminhome");
    }
    const allUser = () => {
        navigate("/users");
    }
    const userPosts = () => {
        navigate("/mylist");
    }

    return (
        <div>
            <Box sx={PageStyles.homepage}>
                <Navbar/>
                {checkRole("ADMIN") === true ? (
                    <BottomBar text={textAdmin} icon={["Forum", "ChatBubble", "Restore", "Help", "Group"]} onClick={[allPostAdmin, userPosts, defaultNavigate, defaultNavigate, allUser]}/>
                ) : (
                    <BottomBar text={text} icon={["Forum", "ChatBubble", "Restore", "Help", "Group"]} onClick={[allPost, userPosts, defaultNavigate, defaultNavigate]}/>
                )}
                <UserPostList posts={posts} setPostList={setPosts}/>
                <AddPostCard setPostList={setPosts} allPosts={false}/>
            </Box>
        </div>
    );
}