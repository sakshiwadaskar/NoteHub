import React from "react";
import {AppBar, Toolbar, Typography} from "@mui/material";


/**
 * Header component for the Meeting Notes Application.
 */
const Header: React.FunctionComponent = () => {

    return (
        <AppBar
            position="static" color={"secondary"}
        >
            <Toolbar>
                <Typography alignContent={"center"}>Meeting Notes Application</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;