import React from "react";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu/Menu";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import {Redirect} from "react-router";
import {NavLink} from "react-router-dom";

function MenuListComposition() {
    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-menu">
                { popupState => (
                    <React.Fragment>
                        <MenuIcon variant="contained" {...bindTrigger(popupState)}/>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                                <NavLink to="/addPlace">
                                    dodaj nowe miejsce
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
         </div>
    )
}
export default MenuListComposition
