export const getPosts = () => 
    async dispatch => {
        dispatch({ type: 'POSTS_LOAD_IN_PROCESS' });

        const response = await fetch(`metadata.json`, {
            mode: 'cors',
        });

        if (!response.ok) {
            return dispatch({ type: 'POSTS_LOAD_ERROR' });
        }

        const { data } = await response.json();
        return dispatch({ type: 'POSTS_LOAD_SUCCESS', payload: data })
    };

export const selectPost = post => ({ type: 'SELECT_POST', payload: post });

export const discardPost = post => 
    async dispatch => {
        dispatch(({ type: 'DISCARDING_POST', payload: post }))

        setTimeout(() => dispatch({ type: 'DISCARD_POST', payload: post }), 2000);
    };

export const clearAll = () => 
    async dispatch => {
        dispatch(({ type: 'DISCARDING_ALL' }))

        setTimeout(() => dispatch({ type: 'DISCARD_ALL' }), 2000);
    };

export const restoreState = state => ({ type: 'RESTORE_STATE', payload: state });