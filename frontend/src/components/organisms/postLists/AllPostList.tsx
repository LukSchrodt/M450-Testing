import React, {useContext, useState, useEffect} from 'react';
import {MyListEntry} from "../../../types/models/MyListEntry.model";
import {Grid} from "@mui/material";
import PostCard from "../../molecules/postcard/PostCard";
import OptionPostCard from "../../molecules/postcard/OptionPostCard";
import './List.css';
import ListStyles from "./ListStyles";
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import PostService from "../../../Services/PostService";

/**
 * This component all posts, but they are not changeable
 */

type Props = {
    posts: MyListEntry[];
    setPostList: Function;
}

export default function AllPostList({posts, setPostList}: Props){
    const { checkRole } = useContext(ActiveUserContext);
    const [list, setList] = useState<MyListEntry[]>([]);
    useEffect(() => {
       setList(posts);
    }, [posts]);

    const renderPostList = () => {
        PostService.getAllPostsSorted().then((response)=> {
            setPostList(response);
        })
    }

    return(
        <div className="list">
            <Grid container spacing={{ xs: 3, md: 3 }} sx={ListStyles.list}>
                {list.map((post: MyListEntry) => (
                    <Grid xs={3} md={3} lg={3} sx={{mt:2}}>
                        {checkRole("ADMIN") === true ? (
                            <OptionPostCard post={post} upDateList={renderPostList}/>
                        ) : (
                            <PostCard post={post}/>
                            )}
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}