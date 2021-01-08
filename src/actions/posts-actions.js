export const getPosts = () => {
    return async dispatch => {
        const response = await fetch(`metadata.json`, {
            mode: 'cors',
        });

        if (!response.ok) {
            return dispatch({ type: 'POSTS_LOAD_ERROR' });
        }

        const { data } = await response.json();
        return dispatch({ type: 'POSTS_LOAD_SUCCESS', payload: data })
    };
};