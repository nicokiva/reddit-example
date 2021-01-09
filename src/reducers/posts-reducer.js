const defaultState = {
    loadingPosts: false,
    errorInLoad: false,
    posts: []
};

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'POSTS_LOAD_IN_PROCESS':
            return {
                ...state,
                loadingPosts: true
            };
        case 'POSTS_LOAD_ERROR': 
            return {
                ...state,
                loadingPosts: false,
                errorInLoad: true,
            };
        case 'POSTS_LOAD_SUCCESS': 
            const { children: data } = action.payload;

            return {
                ...state,
                loadingPosts: false,
                errorInLoad: false,
                posts: data.map(({ data }) => data)
            };
        default: return state
    }
}

export default reducer;