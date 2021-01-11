const defaultState = {
    loadingPosts: false,
    errorInLoad: false,
    posts: [],
    selectedPost: undefined,
    discardingPost: undefined
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
        case 'DISCARDING_POST': 
            const { payload: discardingPost } = action;

            return {
                ...state,
                discardingPost
            };
        case 'DISCARD_POST': 
            const { payload: discarded } = action;

            return {
                ...state,
                posts: state.posts.filter(post => post !== discarded),
                selectedPost: state.selectedPost !== discarded ? state.selectedPost : undefined
            };
            
        default: return state
    }
}

export default reducer;