import React, {useEffect, useState} from 'react';
import {MyListEntry} from "../../../types/models/MyListEntry.model";
import {Grid} from "@mui/material";
import ListStyles from "./ListStyles";
import OptionPostCard from "../../molecules/postcard/OptionPostCard";
import PostCard from "../../molecules/postcard/PostCard";
import PostService from "../../../Services/PostService";

type Props = {
    posts: MyListEntry[];
    setPostList: Function;
}

export default function UserPostList({posts, setPostList}: Props){
    const [list, setList] = useState<MyListEntry[]>([]);
    useEffect(() => {
        setList(posts);
    }, [posts]);

    const renderPostList = () => {
        PostService.getAllPosts().then((response)=> {
            setPostList(response);
        })
    }

    return(
        <div className="list">
            <Grid container spacing={{ xs: 3, md: 3 }} sx={ListStyles.list}>
                {list.map((post: MyListEntry) => (
                    <Grid xs={3} md={3} lg={3} sx={{mt:2}}>
                            <OptionPostCard post={post} upDateList={renderPostList}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}