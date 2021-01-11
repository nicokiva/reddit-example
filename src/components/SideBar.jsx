import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingSpinner } from './utilitarian/LoadingSpinner';
import { ErrorMessage } from './utilitarian/ErrorMessage';
import { PostItem } from './PostItem';
import { connect } from 'react-redux';
import { closeSideBar } from '../actions';

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
        width: '95vw',
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
    },
}));

const SideBarInner = ({ loadingPosts, errorInLoad, posts, sideBarIsOpen }) => {
    const classes = useStyles();

    const handleItemClick = () => {
        if (window.outerWidth <= 800) {
            closeSideBar();
        }
    };

    return (
        <div className={`${classes.root} ${!sideBarIsOpen ? 'collapsed' : ''}`}>
            <div className={classes.sideBar}>
                {loadingPosts && <LoadingSpinner label="Loading posts..." />}
                {errorInLoad && <ErrorMessage label="Error loading data" />}
                {posts && posts.map(post => (<PostItem onClick={handleItemClick} key={post.id} post={post}></PostItem>))}
            </div>
        </div>
    );
};

const mapStateToProps = ({ appReducer }) => ({ ...appReducer });
  
const mapDispatchToProps = dispatch => ({
    closeSideBar: () => dispatch(closeSideBar())
});

export const SideBar = connect(mapStateToProps, mapDispatchToProps)(SideBarInner);