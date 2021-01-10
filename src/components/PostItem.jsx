import React from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectPost } from '../actions'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100px',
        borderBottom: 'solid 1px',
        padding: '5px',
        display: 'flex',
        cursor: 'pointer',
        backgroundColor: 'rgba(236, 84, 40, 0.6)',
        '&:hover': {
            opacity: 0.7
        }
    },
    thumbnail: {
        maxWidth: '100px'
    }
}));

const PostItemInner = ({ post, selectPost }) => {
    const classes = useStyles();

    const handleItemClick = () => selectPost(post);

    return (
        <div className={classes.root} onClick={handleItemClick}>
            {post.thumbnail && <img className={classes.thumbnail} src={post.thumbnail} alt="thumbnail" />}
            <span>{post.title}</span>
        </div>
    );
};

const mapStateToProps = ({ postsReducer }) => ({ ...postsReducer });
  
const mapDispatchToProps = dispatch => ({
    selectPost: post => dispatch(selectPost(post))
});

export const PostItem = connect(mapStateToProps, mapDispatchToProps)(PostItemInner);