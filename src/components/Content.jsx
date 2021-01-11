import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100%',
        padding: '0 20px 0 20px',
        "@media(min-width: 800px)": {
            paddingLeft: '60px',
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