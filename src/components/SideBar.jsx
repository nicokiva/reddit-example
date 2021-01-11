import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingSpinner } from './utilitarian/LoadingSpinner';
import { ErrorMessage } from './utilitarian/ErrorMessage';
import { PostItem } from './PostItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

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

export const SideBar = props => {
    const classes = useStyles();
    const [isOpened, setIsOpened] = useState(true);

    const handleSideBarVisibilityStatus = () => {
        setIsOpened(!isOpened);
    };

    const handleItemClick = () => {
        if (window.outerWidth <= 800) {
            setIsOpened(false);
        }
    };

    return (
        <div className={`${classes.root} ${!isOpened ? 'collapsed' : ''}`}>
            <div className={classes.sideBar}>
                {props.loadingPosts && <LoadingSpinner label="Loading posts..." />}
                {props.errorInLoad && <ErrorMessage label="Error loading data" />}
                {props.posts && props.posts.map(post => (<PostItem onClick={handleItemClick} key={post.id} post={post}></PostItem>))}
            </div>
            <IconButton
                className={classes.button}
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleSideBarVisibilityStatus}
            >
                <MenuIcon />
            </IconButton>
        </div>
    );
};