const defaultState = {
    sideBarIsOpen: false
};

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'OPEN_SIDEBAR':
            return {
                ...state,
                sideBarIsOpen: true
            };
        case 'CLOSE_SIDEBAR': 
            return {
                ...state,
                sideBarIsOpen: false
            };

        default: return state
    }
}

export default reducer;