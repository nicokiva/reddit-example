const defaultState = {
    loadingPosts: false,
    errorInLoad: false,
    posts: [],
    selectedPost: undefined
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
        case 'SELECT_POST': 
            const { payload: selectedPost } = action;

            return {
                ...state,
                selectedPost
            };
            
        default: return state
    }
}

export default reducer;