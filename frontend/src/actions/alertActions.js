import {alertConstants} from "../constants/alertConstants";

export const alertActions = {
    success,
    error,
    clear
};


function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}
function success(message) {
    return { type: alertConstants.SUCCESS, message };
}
