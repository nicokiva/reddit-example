import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        padding: '0 20px 0 60px',
        "@media(min-width: 800px)": {
            position: "unset",
            width: '100%'
        }
    }
}));

export const Content = ({ post }) => {
    const classes = useStyles();
    if (post === undefined) {
        return <></>;
    }

    return (
        <div className={classes.root}>
            <p>Title: {post.title}</p>
        </div>
    )
};