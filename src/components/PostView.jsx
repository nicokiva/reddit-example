import React from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { timeAgo } from './Main';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
        padding: '20px 20px 0 20px',
        width: '100%',
        textAlign: 'left',
        "@media(min-width: 800px)": {
            width: '100%'
        }
    },
    thumbnail: {
        width: '100%',
        height: 'auto',
        maxHeight: '300px',
        "@media(min-width: 800px)": {
            maxHeight: '600px',
        }
    },
    title: {
        fontSize: '17px'
    },
    header: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#6d6c6c'
    },
}));

export const PostViewInner = ({ selectedPost: post }) => {
    const classes = useStyles();
    if (post === undefined) {
        return null;
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <span>{timeAgo.format(new Date(post.created_utc * 1000))}</span>
                <span>Created by {post.author}</span>
            </div>
            {post.thumbnail && <img src={post.thumbnail} className={classes.thumbnail} alt="Thumbnail" />}
            <h1 className={classes.title}>{post.title}</h1>
        </div>
    )
};

const mapStateToProps = ({ postsReducer }) => ({ ...postsReducer });
  
export const PostView = connect(mapStateToProps)(PostViewInner);