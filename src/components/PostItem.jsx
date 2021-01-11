import React from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectPost, discardPost } from '../actions'

const useStyles = makeStyles(theme => ({
    root: {
        transition: 'padding-left 2s, width 2s',
        padding: '10px 10px 0',
        marginBottom: '10px',
        overflow: 'hidden',
        width: 'calc(100vw - 20px)',
        '&.is-discarding': {
            width: 0,
            '& $delete': {
                width: 0,
                border: 0
            }
        },
        '&.is-selected': {
            '& $itemContainer': {
                backgroundColor: '#e8e8e8'
            }
        },
        "@media(min-width: 500px)": {
            width: '470px',
        },
        "@media(min-width: 800px)": {
            '&.is-selected': {
                paddingLeft: '40px'
            }
        },
    },
    itemContainer: {
        transition: 'width 2s, background-color 2s',
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: '10px',
        textAlign: 'left',
        overflow: 'hidden',
        '&:hover': {
            opacity: 0.7
        },
        width: 'calc(100vw - 20px)',
        "@media(min-width: 500px)": {
            width: '460px',
        },
    },
    item: {
        display: 'flex',
        minHeight: '100px',
    },
    delete: {
        borderRadius: '50%',
        border: 'solid 2px',
        height: '15px',
        width: '15px',
        marginRight: '-10px',
        marginTop: '-10px',
        position: 'relative',
        left: 'calc(50% - 7px)',
        top: '12px',
        "@media(min-width: 500px)": {
            left: 'calc(50% - 6px - 10px)', // 6px = icon width / 2, 10px = difference with container's margin
        },
    },
    thumbnail: {
        maxWidth: '100px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
    },
    title: {
        margin: '5px 10px',
        fontWeight: 'bold'
    }
}));

const PostItemInner = ({ selectedPost, discardingPost, post, selectPost, discardPost, onClick }) => {
    const classes = useStyles();

    const isSelected = post === selectedPost;
    const isDiscarding = post === discardingPost;

    const handleItemClick = () => {
        selectPost(post);
        onClick();
    };

    const handleDelete = event => {
        event.stopPropagation();
        discardPost(post);
    }

    return (
        <article className={`${classes.root} ${isSelected ? 'is-selected' : ''} ${isDiscarding ? 'is-discarding' : ''}`} onClick={handleItemClick}>
            <img className={classes.delete} src="/delete-icon.svg" alt="delete" title="Discard" onClick={handleDelete} />
            <div className={classes.itemContainer}>
                <div className={classes.item}>
                    {post.thumbnail && <img className={classes.thumbnail} src={post.thumbnail} alt="thumbnail" />}
                    <p className={classes.title}>{post.title}</p>
                </div>
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