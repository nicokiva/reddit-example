import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../actions'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'rgb(236, 84, 40)',
        position: 'static',
        top: 0,
        left: 0,
        maxWidth: '400px',
        height: '100vh',
        border: 'solid 1px'
    }
}));

const SideBar = props => {
    const classes = useStyles();

    useEffect(() => {
        props.getPosts();
    });

    return <div className={classes.root}>dsd</div>
};

const mapStateToProps = state => ({})
  
const mapDispatchToProps = dispatch => ({
    getPosts: () => {
        dispatch(actions.getPosts())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);