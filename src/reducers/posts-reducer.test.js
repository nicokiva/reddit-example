import reducer from './posts-reducer';

describe('posts-reducer', () => {
    const other = { property: 'something' };

    test('should return posts are being loaded', () => {
        const newState = reducer({ loadingPosts: false, ...other }, { type: 'POSTS_LOAD_IN_PROCESS' });
        expect(newState).toEqual({ loadingPosts: true, ...other })
    });

    test('should return posts load failed', () => {
        const newState = reducer({ loadingPosts: true, posts: ['there', 'is', 'something'], ...other }, { type: 'POSTS_LOAD_ERROR' });
        expect(newState).toEqual({ loadingPosts: false, posts: ['there', 'is', 'something'], errorInLoad: true, ...other })
    });

    test('should add new posts to posts list', () => {
        const newState = reducer({ loadingPosts: true, posts: [], ...other }, { type: 'POSTS_LOAD_SUCCESS', payload: { children: [{ kind: 'kind', data: { id: 1 } }, { kind: 'unkind', data: { id: 98 } }] } });
        expect(newState).toEqual(
            { 
                loadingPosts: false, 
                posts: [{ id: 1 }, { id: 98 }], 
                errorInLoad: false, 
                lastPostId: 'unkind_98', 
                ...other 
            }
        )
    });

    test('should append new post to posts list', () => {
        const newState = reducer({ loadingPosts: true, posts: ['there', 'is', 'something'], ...other }, { type: 'POSTS_LOAD_SUCCESS', payload: { children: [{ kind: 'kind', data: { id: 1 } }] } });
        expect(newState).toEqual(
            { 
                loadingPosts: false, 
                posts: ['there', 'is', 'something', { id: 1 }], 
                errorInLoad: false, 
                lastPostId: 'kind_1', 
                ...other 
            }
        )
    });

    test('should select specific post from the list and add to the read posts', () => {
        const newState = reducer({ readPosts: [], ...other }, { type: 'SELECT_POST', payload: { id: 1 } });
        expect(newState).toEqual(
            { 
                readPosts: [{ id: 1 }],
                selectedPost: { id: 1 },
                ...other 
            }
        )
    });

    test('should select specific post from the list and append to the read posts', () => {
        const newState = reducer({ readPosts: [{ id: 1 }], ...other }, { type: 'SELECT_POST', payload: { id: 98 } });
        expect(newState).toEqual(
            { 
                readPosts: [{ id: 1 }, { id: 98 }],
                selectedPost: { id: 98 },
                ...other 
            }
        )
    });

    test('should select specific post from the list but not append to the read posts as was already appended', () => {
        const post98 = { id: 98 }; // Need to keep reference so that includes detect they are the same.
        const newState = reducer({ readPosts: [{ id: 1 }, post98], ...other }, { type: 'SELECT_POST', payload: post98 });
        expect(newState).toEqual(
            { 
                readPosts: [{ id: 1 }, { id: 98 }],
                selectedPost: { id: 98 },
                ...other 
            }
        )
    });

    test('should set a specific post as discarding', () => {
        const newState = reducer(other, { type: 'DISCARDING_POST', payload: { id: 1 } });
        expect(newState).toEqual(
            { 
                discardingPost: { id: 1 },
                ...other 
            }
        )
    });

    test('should discard a specific post but keep selected post', () => {
        const post1 = { id: 1 };
        const newState = reducer({ posts: [post1, { id: 98 }], selectedPost: { id: 98 }, ...other }, { type: 'DISCARD_POST', payload: post1 });
        expect(newState).toEqual(
            { 
                posts: [{ id: 98 }],
                selectedPost: { id: 98 },
                ...other 
            }
        )
    });

    test('should discard a specific post and remove selected post', () => {
        const post1 = { id: 1 };
        const newState = reducer({ posts: [post1, { id: 98 }], selectedPost: post1, ...other }, { type: 'DISCARD_POST', payload: post1 });
        expect(newState).toEqual(
            { 
                posts: [{ id: 98 }],
                selectedPost: undefined,
                ...other 
            }
        )
    });

    test('should set posts as discarding and remove current selection', () => {
        const post1 = { id: 1 };
        const newState = reducer({ selectedPost: post1, ...other }, { type: 'DISCARDING_ALL' });
        expect(newState).toEqual(
            { 
                isDiscardingAll: true,
                selectedPost: undefined,
                ...other 
            }
        )
    });

    test('should discard all the posts and set is discarding as false', () => {
        const newState = reducer(other, { type: 'DISCARD_ALL' });
        expect(newState).toEqual(
            { 
                isDiscardingAll: false,
                posts: [],
                ...other 
            }
        )
    });

    test('should restore existing state', () => {
        const newState = reducer(other, { type: 'RESTORE_STATE', payload: { readPosts: [{ id: 1 }], posts: [{ id: 1 }] } });
        expect(newState).toEqual(
            { 
                readPosts: [{ id: 1 }],
                posts: [{ id: 1 }],
                ...other 
            }
        )
    });

    test('should restore existing state with less read than amount of posts', () => {
        const newState = reducer(other, { type: 'RESTORE_STATE', payload: { readPosts: [{ id: 1 }], posts: [{ id: 1 }, { id: 11 }] } });
        expect(newState).toEqual(
            { 
                readPosts: [{ id: 1 }],
                posts: [{ id: 1 }, { id: 11 }],
                ...other 
            }
        )
    });

    test('should restore existing state overriding existing', () => {
        const newState = reducer({ posts: [{ id: 11 }], readPosts: [{ id: 11 }], ...other }, { type: 'RESTORE_STATE', payload: { readPosts: [{ id: 1 }], posts: [{ id: 1 }] } });
        expect(newState).toEqual(
            { 
                readPosts: [{ id: 1 }],
                posts: [{ id: 1 }],
                ...other 
            }
        )
    });

    test('should return current status as type does not exist', () => {
        const newState = reducer(other, { type: 'UNKNOWN_TYPE', payload: { readPosts: [{ id: 1 }], posts: [{ id: 1 }] } });
        expect(newState).toEqual(other);
    });

});