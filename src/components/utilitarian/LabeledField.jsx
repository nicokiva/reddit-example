import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
       display: 'flex',
       flexFlow: 'column',
       paddingTop: '50px'
    },
    content: {
        margin: '0 auto 20px'
    }
}));

export const LabeledField = ({ children, label }) => {
    const classes = useStyles();
   
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {children}
            </div>
            <span>{label}</span>
        </div>
    )
};