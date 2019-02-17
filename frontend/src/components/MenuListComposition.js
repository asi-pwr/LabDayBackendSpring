import React from "react";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu/Menu";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';

function MenuListComposition() {
    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-menu">
                { popupState => (
                    <React.Fragment>
                        <MenuIcon variant="contained" {...bindTrigger(popupState)}/>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>ExampleItem</MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
         </div>
    )
}
export default MenuListComposition
