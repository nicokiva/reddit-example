import React from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectPost, discardPost } from '../actions'

const useStyles = makeStyles(theme => ({
    root: {
        transition: 'padding-left 2s',
        padding: '10px 0 0 10px',
        marginBottom: '10px',
        width: '90vw',
        "@media(min-width: 500px)": {
            width: '460px',
        },
        "@media(min-width: 800px)": {
            '&.selected': {
                paddingLeft: '40px'
            }
        }
    },
    item: {
        minHeight: '100px',
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        textAlign: 'left',
        '&:hover': {
            opacity: 0.7
        }
    },
    itemContainer: {
        display: 'flex'
    },
    delete: {
        borderRadius: '50%',
        border: 'solid 2px',
        height: '15px',
        width: '15px',
        marginRight: '-10px',
        marginTop: '-10px'
    },
    thumbnail: {
        maxWidth: '100px',
    },
    title: {
        margin: '5px 10px',
        fontWeight: 'bold'
    }
}));

const PostItemInner = ({ selectedPost, post, selectPost, onClick }) => {
    const classes = useStyles();

    const isSelected = post === selectedPost;

    const handleItemClick = () => {
        selectPost(post);
        onClick();
    };

    const handleDelete = event => {
        event.stopPropagation();
    }

    return (
        <article className={`${classes.root} ${isSelected ? 'selected' : ''}`} onClick={handleItemClick}>
            <div className={classes.item}>
                <div className={classes.itemContainer}>
                    {post.thumbnail && <img className={classes.thumbnail} src={post.thumbnail} alt="thumbnail" />}
                    <p className={classes.title}>{post.title}</p>
                </div>
                <img className={classes.delete} src="/delete-icon.svg" alt="delete" title="Discard" onClick={handleDelete} />
            </div>
        </article>
    );
};

const mapStateToProps = ({ postsReducer }) => ({ ...postsReducer });
  
const mapDispatchToProps = dispatch => ({
    selectPost: post => dispatch(selectPost(post)),
    discardPost: post => dispatch(discardPost(post))
});

export const PostItem = connect(mapStateToProps, mapDispatchToProps)(PostItemInner);