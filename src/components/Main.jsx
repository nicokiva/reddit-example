import React, { useEffect } from 'react';
import { SideBar } from './SideBar';
import { getPosts } from '../actions'
import { connect } from 'react-redux';
import { Content } from './Content';
import { AppBar } from './AppBar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    contentWrapper: {
        marginTop: '65px',
        display: 'flex'
    }
}));

const MainInner = ({ posts, selectedPost, getPosts }) => {
    const classes = useStyles();

    useEffect(() => {
        getPosts();
    }, []);

    return <>
        <AppBar />
        <div className={classes.contentWrapper}>
            <SideBar posts={posts} />
            <Content post={selectedPost} />
        </div>
    </>
};

const mapStateToProps = ({ postsReducer }) => ({ ...postsReducer });
  
const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainInner);