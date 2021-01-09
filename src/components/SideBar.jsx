import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { PostItem } from './PostItem';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'rgba(236, 84, 40, 0.6)',
        position: 'static',
        top: 0,
        left: 0,
        maxWidth: '400px',
        height: '100vh',
        borderRight: 'solid 1px rgb(236, 84, 40)',
        overflowY: 'auto'
    }
}));

const SideBar = props => {
    const classes = useStyles();

    useEffect(() => {
        props.getPosts();
    }, []);

    console.log(props);
    return (
        <div className={classes.root}>
            {props.loadingPosts && <LoadingSpinner label="Loading posts..." />}
            {props.errorInLoad && <ErrorMessage label="Error loading data" />}
            {props.posts && props.posts.map(post => (<PostItem key={post.id} post={post}></PostItem>))}
        </div>
    );
};

const mapStateToProps = ({ postsReducer }) => postsReducer;
  
const mapDispatchToProps = dispatch => ({
    getPosts: () => {
        dispatch(actions.getPosts())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);