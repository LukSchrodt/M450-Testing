import React, {MouseEventHandler} from 'react';
import {Button, SxProps} from "@mui/material";

/**
 * Normal Button Component
 */

type Props = {
    text: string;
    variant?: "outlined" | "text" | "contained";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    sx?: SxProps;
    disabled?: boolean;
};

export default function NormalButton({text, variant="contained", onClick=undefined, sx={}, disabled=undefined}: Props){
    return(
        <Button variant={variant} onClick={onClick} sx={sx} disabled={disabled}>
            {text}
        </Button>
    );
}