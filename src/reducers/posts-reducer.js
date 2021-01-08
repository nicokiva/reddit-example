const defaultState = {
    errorInLoad: false,
    posts: []
};

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'OPEN_SIDEBAR':
            return {
                ...state,
                sidebarIsOpen: true
            };
        case 'CLOSE_SIDEBAR':
            return {
                ...state,
                sidebarIsOpen: false
            };
        default: return state
    }
}

export default reducer;