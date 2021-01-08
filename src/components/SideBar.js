import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

export const SideBar = () => {
    const classes = useStyles();

    return <div className={classes.root}>dsd</div>
};