const defaultState = {
    loadingPosts: false,
    errorInLoad: false,
    posts: [],
    lastPostId: undefined,
    readPosts: [],
    selectedPost: undefined,
    discardingPost: undefined,
    isDiscardingAll: false,
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
                posts: [...state.posts, ...data.map(({ data }) => data)],
                lastPostId: `${data[data.length - 1].kind}_${data[data.length - 1].data.id}`
            };
        case 'SELECT_POST': 
            const { payload: selectedPost } = action;

            return {
                ...state,
                selectedPost,
                readPosts: !state.readPosts.includes(selectedPost) ? [...state.readPosts, selectedPost] : state.readPosts
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
        case 'DISCARDING_ALL': 
            return {
                ...state,
                isDiscardingAll: true,
                selectedPost: undefined
            };
        case 'DISCARD_ALL': 
            return {
                ...state,
                isDiscardingAll: false,
                posts: []
            };
        case 'RESTORE_STATE':
            const { readPosts: read, posts, ...others } = action.payload;
            const readPosts = read.map(({ id: readPostId }) => posts.find(({ id: postId }) => readPostId === postId));

            return {
                ...state,
                readPosts,
                posts,
                ...others
            }
        
        default: return state
    }
}

export default reducer;