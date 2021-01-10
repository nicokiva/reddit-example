import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100px',
        borderBottom: 'solid 1px',
        padding: '5px',
        display: 'flex'
    },
    thumbnail: {
        maxWidth: '100px'
    }
}));

export const PostItem = ({ post }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {post.thumbnail && <img className={classes.thumbnail} src={post.thumbnail} alt="thumbnail" />}
            <span>{post.title}</span>
        </div>
    );
};