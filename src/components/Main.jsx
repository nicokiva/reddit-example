import React, { useEffect } from 'react';
import { SideBar } from './SideBar';
import { getPosts } from '../actions'
import { connect } from 'react-redux';
import { Content } from './Content';

const MainInner = ({ posts, selectedPost, getPosts }) => {
    useEffect(() => {
        getPosts();
    }, []);

    return <>
        <SideBar posts={posts} />
        <Content post={selectedPost} />
    </>
};

const mapStateToProps = ({ postsReducer }) => ({ ...postsReducer });
  
const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainInner);