import React from 'react';
import { SideBar } from './SideBar';
import { PostView } from './PostView';
import { AppBar } from './AppBar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    contentWrapper: {
        marginTop: '65px',
        display: 'flex',
        width: '100%'
    }
}));

export const Main = () => {
    const classes = useStyles();


    return (
        <>
            <AppBar />
            <div className={classes.contentWrapper}>
                <SideBar />
                <PostView />
            </div>
        </>
    )
};