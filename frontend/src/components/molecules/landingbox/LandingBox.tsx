import React from 'react';
import {Box, Card, Typography} from "@mui/material";
import NormalButton from "../../atoms/buttons/normalbutton/NormalButton";
import {useNavigate} from "react-router-dom";


/**
 * Box with content with appear on the LandingPage
 */

type Props = {
    title: string;
    text: string;
}
export default function LandingBox({title, text}: Props){
    const navigate = useNavigate();
    const toLogin = () => {
        navigate("/login");
    }
    return(
        <Box sx={{width: "50%", ml: "25%", mr: "25%", height: "50%", mt: "10%"}}>
            <Card sx={{height: "100%", width: "100%"}}>
                <Typography variant="h4" sx={{ml: "23%", mt: 5}}>{title}</Typography>
                <NormalButton text="TO Sign In" onClick={toLogin} variant="contained" sx={{width: "70%", mt: 20, ml: "15%", mr: "15%"}}/>
                <Typography variant="body2" sx={{ml: "15%", mt: 2, width: "70%", mr: "15%"}}>{text}</Typography>
            </Card>
        </Box>
    );
}