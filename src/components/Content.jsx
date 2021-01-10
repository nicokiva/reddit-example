import { React, useEffect } from 'react';
import SideBar from './SideBar';
import { getPosts } from '../actions'
import { connect } from 'react-redux';

const Content = ({ posts, getPosts }) => {
    useEffect(() => {
        getPosts();
    }, []);

    return <>
        <SideBar posts={posts} />
    </>
};

const mapStateToProps = ({ postsReducer }) => ({ ...postsReducer });
  
const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);