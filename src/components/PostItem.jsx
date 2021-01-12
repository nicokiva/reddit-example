import React from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { selectPost, discardPost } from '../actions';
import { date2string } from '../helpers/date';

const useStyles = makeStyles(() => ({
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
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
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
        width: '100%'
    },
    info: {
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        backgroundColor: 'rgb(255, 170, 138)',
        width: 'calc(100vw - 20px)',
        padding: '5px 10px',
        height: '10px',
        "@media(min-width: 500px)": {
            width: '440px', // 460px itemContainer width - 20px padding
        },
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
    postInfo: {
        margin: '10px',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        width: '100%'
    },
    createdDate: {
        textAlign: 'right',
        fontSize: '13px',
        color: '#6d6c6c'
    },
    thumbnail: {
        maxWidth: '100px',
    },
    title: {
        fontWeight: 'bold'
    },
    metaInfo: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    notReadIndicator: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#69698c'
    }
}));

const PostItemInner = ({ selectedPost, discardingPost, post, readPosts, selectPost, discardPost, onClick, isDiscardingAll }) => {
    const classes = useStyles();

    const isRead = readPosts.includes(post);
    const isSelected = post === selectedPost;
    const isDiscarding = post === discardingPost || isDiscardingAll;

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
                    <div className={classes.postInfo}>
                        <span className={classes.title}>{post.title}</span>
                        <div className={classes.metaInfo}>
                            <span className={classes.createdDate}>by {post.author}</span>
                            <span className={classes.createdDate}>at {date2string(post.created_utc)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.info}>
                {!isRead && <div className={classes.notReadIndicator}></div>}
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