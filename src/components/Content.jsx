import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        "@media(min-width: 600px)": {
            marginLeft: '50px',
            position: "unset"
        }
    }
}));

export const Content = ({ post }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
        </div>
    )
};