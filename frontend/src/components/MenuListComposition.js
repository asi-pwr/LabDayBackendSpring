import React from "react";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import Menu from "@material-ui/core/Menu/Menu";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state/index';
import {connect} from "react-redux";

function MenuListComposition(props) {
    if (!props.auth) {
        return (
            <MenuIcon/>
        )
    }
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

const mapStateToProps = state => ({
    auth: state.authentication
})
export default connect(mapStateToProps)(MenuListComposition)
