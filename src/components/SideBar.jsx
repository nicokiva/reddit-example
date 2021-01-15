import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingSpinner } from './utilitarian/LoadingSpinner';
import { ErrorMessage } from './utilitarian/ErrorMessage';
import { WarningMessage } from './utilitarian/WarningMessage';
import { PostItem } from './PostItem';
import { connect } from 'react-redux';
import { closeSideBar, getPosts } from '../actions';

const useStyles = makeStyles(() => ({
    root: {
        zIndex: 1,
        display: 'flex',
        '&.collapsed': {
            '& $sideBar': {
                width: 0,
                border: 0
            },
            '& $button': {
                right: 'calc(100% - 47px)', // 48px = width, 1px = border
            }
        }
    },
    sideBar: {
        position: 'static',
        top: 0,
        left: 0,
        height: '100vh',
        overflowY: 'auto',
        transition: 'width 2s',
        width: '100vw',
        "@media(min-width: 500px)": {
            width: '520px',
        }
    },
    button: {
        transition: 'right 2s',
        position: 'absolute',
        top: '10px',
        right: 0,
        backgroundColor: '#cac8c8',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: 'rgba(202, 200, 200, .7)', // Needs to override default
        },
        "@media(min-width: 600px)": {
            right: 'calc(100% - 500px + 1px)' // 100% = viewport, 500px = sidebar width, 1px = border
        }
    }
}));

const SideBarInner = ({ loadingPosts, errorInLoad, posts, sideBarIsOpen, closeSideBar, getPosts, lastPostId }) => {
    const classes = useStyles();

    const sideBarRef = useRef(null);
    useEffect(() => {
        // Initial request used to fetch first 10 records.
        getPosts();
    }, [getPosts]);

    // When user reaches the end of the list, it triggers a reload of the items.
    // As scroll event is triggered many times, this semaphore
    // is used to prevent to reload many times.
    // 'loadingPosts' var cannot be used because it arrives async, so by the moment it comes,
    // the event executed many times.
    let isLoading = false;
    useEffect(() => {
        const onScroll = () => {
            if (
                sideBarRef.current.scrollTop + sideBarRef.current.clientHeight >=
                sideBarRef.current.scrollHeight &&
                !isLoading &&
                lastPostId
            ) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                isLoading = true;
                getPosts(lastPostId);
            }
        };

        sideBarRef.current.addEventListener('scroll', onScroll)

        return () => window.removeEventListener("scroll", onScroll);
    }, [getPosts, lastPostId]);


    const handleItemClick = () => {
        if (window.outerWidth <= 800) {
            closeSideBar();
        }
    };

    return (
        <div className={`${classes.root} ${!sideBarIsOpen ? 'collapsed' : ''}`}>
            <div className={classes.sideBar} ref={sideBarRef}>
                {errorInLoad && <ErrorMessage label="Error loading data" />}
                {posts && posts.map(post => (<PostItem onClick={handleItemClick} key={post.id} post={post}></PostItem>))}
                {!posts.length && <WarningMessage label="Nothing to be displayed!" />}
                {loadingPosts && <LoadingSpinner label="Loading posts..." />}
            </div>
        </div>
    );
};

const mapStateToProps = ({ appReducer, postsReducer }) => ({ ...appReducer, ...postsReducer });
  
const mapDispatchToProps = dispatch => ({
    closeSideBar: () => dispatch(closeSideBar()),
    getPosts: lastPostId => dispatch(getPosts(lastPostId))
});

export const SideBar = connect(mapStateToProps, mapDispatchToProps)(SideBarInner);