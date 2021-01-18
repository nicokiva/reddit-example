import React, { useState } from 'react';
import AppBarMaterial from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';
import { connect } from 'react-redux';
import { openSideBar, closeSideBar, clearAll, restoreState } from '../actions';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#fff'
    },
    button: {
        marginLeft: '10px',
        width: '48px',
        backgroundColor: 'rgb(255, 69, 0)',
        '&:hover': {
            backgroundColor: 'rgb(255, 69, 0)',
            opacity: 0.7
        },
        '&.is-opened': {
            backgroundColor: 'rgb(204, 55, 0)'
        }
    },
    openDrawer: {
        marginLeft: '0',
    },
    sideBarHandlerContainer: {
        transition: 'width 1s',
        width: '48px',
        overflow: 'hidden',
        display: 'flex',
        '&.is-opened': {
            width: '106px'
        }
    }
}));

const STORAGE_KEY = 'REDDIT_EXAMPLE';

const AppBarInner = ({ openSideBar, closeSideBar, clearAll, restoreState, postsReducer, appReducer }) => {
    const [ saved, setSaved ] = useState(false);

    const { sideBarIsOpen } = appReducer;

    const classes = useStyles();

    const handleClearAll = () => clearAll();

    const save = () => {
        const { posts, readPosts, selectedPost, lastPostId } = postsReducer;
        // Only saves last in storage.
        setSaved(true);
        try {
            // We don't need to save any status or any flag.
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ posts, readPosts, selectedPost, lastPostId }));
        } catch ({ name }) {
            if (name === 'QuotaExceededError') {
                alert('Oops, the amount of posts you are trying to save exceeds the quota, please remove many from the list and retry!')
            }
        }
    };

    const restore = () => {
        const lastState = localStorage.getItem(STORAGE_KEY);
        if(!lastState) {
            return;
        }

        restoreState(JSON.parse(lastState));
    };

    // User is able to restore only if there is anything to restore:
    // 1. just saved
    // 2. something already stored.
    const canRestore = saved || localStorage.getItem(STORAGE_KEY) !== null;

    return (
        <AppBarMaterial className={classes.root}>
            <Toolbar>
                <div className={`${classes.sideBarHandlerContainer} ${sideBarIsOpen ? 'is-opened' : ''}`}>
                    <IconButton
                        className={`${classes.button} ${classes.openDrawer} ${sideBarIsOpen ? 'is-opened' : ''}`}
                        color="inherit"
                        aria-label="open drawer"
                        data-testid="sidebar-opener"
                        onClick={sideBarIsOpen ? closeSideBar : openSideBar}
                    >
                        <MenuIcon />
                    </IconButton>

                    <IconButton
                        className={classes.button}
                        color="inherit"
                        aria-label="clear all"
                        onClick={handleClearAll}
                    >
                        <ClearAllIcon />
                    </IconButton>
                </div>
                <IconButton
                    className={classes.button}
                    color="inherit"
                    aria-label="save"
                    onClick={save}
                >
                    <SaveIcon />
                </IconButton>
                {canRestore && <IconButton
                    className={classes.button}
                    color="inherit"
                    aria-label="restore"
                    onClick={restore}
                >
                    <RestoreIcon />
                </IconButton>}
            </Toolbar>
        </AppBarMaterial>
    )
};

const mapStateToProps = reducers => reducers;
  
const mapDispatchToProps = dispatch => ({
    openSideBar: () => dispatch(openSideBar()),
    closeSideBar: () => dispatch(closeSideBar()),
    clearAll: () => dispatch(clearAll()),
    restoreState: state => dispatch(restoreState(state))
});

export const AppBar = connect(mapStateToProps, mapDispatchToProps)(AppBarInner);