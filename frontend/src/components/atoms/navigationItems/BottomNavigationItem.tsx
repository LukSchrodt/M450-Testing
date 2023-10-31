import React, { MouseEventHandler } from 'react';
import * as icons from "@mui/icons-material";
import {Button, Typography} from "@mui/material";

/**
 * A Bottombar Button
 * Contains a Icon and a text
 */

/**
 * Type of Mui Icon
 */
export type IconNames = keyof typeof icons;

type Props = {
    text: string;
    icon: IconNames;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function BottomNavigationItem({text, icon, onClick=undefined}: Props){
    const Icon = icons[icon];
    return(
        <Button onClick={onClick} sx={{flex: 1}}>
                <Icon/>
            <Typography variant="body1">{text}</Typography>
        </Button>
    );
}