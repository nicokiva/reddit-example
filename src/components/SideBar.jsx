import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingSpinner } from './utilitarian/LoadingSpinner';
import { ErrorMessage } from './utilitarian/ErrorMessage';
import { PostItem } from './PostItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '&.collapsed': {
            '& $sideBar': {
                width: 0,
                border: 0
            },
            '& $button': {
                left: 'calc(0px + 12px + 1px)', // 0 = sidebar width (collapsed), 12px = menu item padding, 1px = border
            }
        }
    },
    sideBar: {
        backgroundColor: 'rgba(236, 84, 40, 0.6)',
        position: 'static',
        top: 0,
        left: 0,
        width: '400px',
        height: '100vh',
        borderRight: 'solid 1px rgb(236, 84, 40)',
        overflowY: 'auto',
        transition: 'width 2s',
    },
    button: {
        transition: 'left 2s',
        position: 'absolute',
        top: 0,
        left: 'calc(400px + 12px + 1px)', // 400px = sidebar width, 12px = menu item padding, 1px = border
        backgroundColor: '#cac8c8',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: 'rgba(202, 200, 200, .7)', // Needs to override default
        }
    },

}));

const SideBar = props => {
    const classes = useStyles();
    const [isOpened, setIsOpened] = useState(true);

    const handleSideBarVisibilityStatus = () => {
        setIsOpened(!isOpened);
    }

    return (
        <div className={`${classes.root} ${!isOpened ? 'collapsed' : ''}`}>
            <div className={classes.sideBar}>
                {props.loadingPosts && <LoadingSpinner label="Loading posts..." />}
                {props.errorInLoad && <ErrorMessage label="Error loading data" />}
                {props.posts && props.posts.map(post => (<PostItem key={post.id} post={post}></PostItem>))}
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

export default SideBar;