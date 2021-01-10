import React from 'react';
import { LabeledField } from './LabeledField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    image: {
       height: '50px',
       width: '50px'
    }
}));

export const ErrorMessage = ({ label }) => {
    const classes = useStyles();

    return (
        <LabeledField label={label}>
            <img src="/error-icon.png" alt="error" className={classes.image} />
        </LabeledField>
    )
};