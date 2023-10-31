import {SxProps} from "@mui/material";

const homepage : SxProps = {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "hidden",
};

const landingpage : SxProps = {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "hidden",
    background: 'linear-gradient(to right bottom, #7aabf5, #0066ff)',
}

export default {homepage, landingpage};