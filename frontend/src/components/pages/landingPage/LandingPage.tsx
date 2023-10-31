import React from 'react';
import PageStyles from "../PageStyles";
import {Box} from "@mui/material";
import LandingBox from "../../molecules/landingbox/LandingBox";

export default function LandingPage(){
    return(
        <div>
            <Box sx={PageStyles.landingpage}>
                <LandingBox title="Welcome to the Omega Blog" text="Sorry but you cant visit the Noser Blog as a Guest. You are only allowed to enter the Noser Blog if you are logged in."/>
            </Box>
        </div>
    );
}
