import { Card, Divider, Grid, Typography } from '@mui/material';
import React, {useEffect, useState } from 'react';
import { MyListEntry } from '../../../types/models/MyListEntry.model';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NormalButton from '../../atoms/buttons/normalbutton/NormalButton';
import PostService from "../../../Services/PostService";
import UpdatePostCard from "../../organisms/updatePostCard/UpdatePostCard";

/**
 * This Component contains a Pop up
 * The Pop Up is used to change the post
 *
 * This Component is used by the admin or if its the post of a user
 */

type Props = {
    post: MyListEntry;
    upDateList: Function;
}

export default function OptionPostCard({post, upDateList}: Props){
    const [color, setColor] = useState("#5c5c5c");
    useEffect(() => {
        switch (post.priority){
            case "HIGH":
                setColor("#fc0303");
                break;
            case "MEDIUM":
                setColor("#fcc203");
                break;
            case "LOW":
                setColor("#04d616");
                break;
        }

    }, [post]);

    const deletePost = () => {
        PostService.deletePost(post.id).then((response) => {
            upDateList();
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <Card sx={{width: "95%", height: 380}}>
            <Grid container alignItems="center">
                <Grid xs={6} md={6} lg={6}>
                    <Typography variant="body2" color="inherit" sx={{ml: 1, fontSize: 15}}>{post.date.toLocaleString()}</Typography>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{textAlign: "right"}}>
                    <PriorityHighIcon sx={{display: "inline", color: color, fontSize: "large", mt:"1%"}}/>
                    <Typography variant="body2" color="inherit" sx={{display: "inline", mr: 1, fontSize: 15}}>{post.priority}</Typography>
                </Grid>
                <Grid xs={12} md={12} lg={12} sx={{mt: 1}}>
                    <Typography variant="h5" sx={{ml:1, height: 50}}>{post.title}</Typography>
                </Grid>
                <Divider sx={{width: "950%", mt: 1, mb: 2}}/>
                <Grid xs={12} md={12} lg={12} sx={{mb: 1}}>
                    <Typography variant="body1" sx={{ml:1, width: "90%", height: 150}}>{post.text}</Typography>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{mt:7, mb: 3}}>
                    <UpdatePostCard post={post} renderPostList={upDateList}/>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{mt:7, mb: 3}}>
                <NormalButton text="Delete" sx={{bgcolor: "#a67f32", mr: 5}} onClick={deletePost}/>
                </Grid>
            </Grid>
        </Card>
    )

}