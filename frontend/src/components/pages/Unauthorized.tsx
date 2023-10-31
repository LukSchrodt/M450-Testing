import React from 'react';
import PageStyles from "./PageStyles";
import {Box} from "@mui/material";
import LandingBox from "../molecules/landingbox/LandingBox";

/**
 * Page which is displayed if the user is unauthorized
 */

export default function Unauthorized(){
    return(
        <div>
        <Box sx={PageStyles.landingpage}>
            <LandingBox title="You're Unauthorized" text="Sorry but you cant visit the Noser Blog as a Guest. You are only allowed to enter the Noser Blog if you a user and logged in"/>
        </Box>
        </div>
    );
}