import React, { MouseEventHandler } from 'react';
import BottomBarStyles from "./BottomBarStyles";
import {ButtonGroup} from "@mui/material";
import BottomNavigationItem from "../../atoms/navigationItems/BottomNavigationItem";
import * as icons from "@mui/icons-material";

/**
 * Bottom Navigation Bar
 * Is used to navigate to different Pages
 */

export type IconNames = keyof typeof icons;
type Props = {
    text: string[];
    icon: IconNames[];
    onClick: MouseEventHandler<HTMLButtonElement>[];
}

export default function BottomBar({text, icon, onClick}: Props){
    return(
        <ButtonGroup variant="contained" sx={BottomBarStyles.bottomBar}>
            {text.map((text:string, index) => (
                <BottomNavigationItem text={text} icon={icon[index]} onClick={onClick[index]}/>
            ))}
        </ButtonGroup>
    )
}

