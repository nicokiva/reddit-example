import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100px',
    }
}));

export const PostItem = ({ post }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>{post.title}</div>
    );
};