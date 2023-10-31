import React, {useEffect, useState} from 'react';
import {MyListEntry} from "../../../types/models/MyListEntry.model";
import {Card, Divider, Grid, Typography} from "@mui/material";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';


/**
 * This is the Component to display a post (myListEntry)
 *
 */

type Props = {
    post: MyListEntry
}
export default function PostCard({post}: Props){
    const [color, setColor] = useState("#5c5c5c");
    useEffect(() => {
        switch (post.priority){
            case "High" || "HIGH":
                setColor("#fc0303");
                break;
            case "Medium" || "MEDIUM":
                setColor("#fcc203");
                break;
            case "Low" || "LOW":
                setColor("#04d616");
                break;
        }

    }, [post]);


    return(
        <Card sx={{width: "95%", height: 300}}>
            <Grid container alignItems="center">
                <Grid xs={6} md={6} lg={6}>
                    <Typography variant="body2" color="inherit" sx={{ml: 1, fontSize: 15}}>{post.date.toLocaleString()}</Typography>
                </Grid>
                <Grid xs={6} md={6} lg={6} sx={{textAlign: "right"}}>
                    <PriorityHighIcon sx={{display: "inline", color: color, fontSize: "large", mt:"1%"}}/>
                    <Typography variant="body2" color="inherit" sx={{display: "inline", mr: 1, fontSize: 15}}>{post.priority}</Typography>
                </Grid>
                <Grid xs={12} md={12} lg={12} sx={{mt: 1}}>
            <Typography variant="h5" sx={{ml:1}}>{post.title}</Typography>
                </Grid>
                <Divider sx={{width: "950%", mt: 1, mb: 2}}/>
                <Grid xs={12} md={12} lg={12} sx={{mb: 1}}>
                    <Typography variant="body1" sx={{ml:1}}>{post.text}</Typography>
                </Grid>
            </Grid>
        </Card>
    )
}