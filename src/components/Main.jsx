import React from 'react';
import { SideBar } from './SideBar';
import { PostView } from './PostView';
import { AppBar } from './AppBar';
import { makeStyles } from '@material-ui/core';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
export const timeAgo = new TimeAgo('en-US')

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