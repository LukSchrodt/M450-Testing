import React, { MouseEventHandler } from 'react';
import * as icons from "@mui/icons-material";
import { Fab } from '@mui/material';

/**
 * Floating actionbutton
 */

export type IconNames = keyof typeof icons;
type Props = {
    icon: IconNames;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    text: string;
}

export default function FloatingActionButton({icon, onClick=undefined, text}: Props){
    const Icon = icons[icon];
    return(
        <Fab variant="extended" sx={{color: "#6b6b6a", position: "fixed", right: 20, bottom: 16}} onClick={onClick}>
            <Icon/>
            {text}
        </Fab>
    )
}