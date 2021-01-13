import React from 'react';
import { LabeledField } from './LabeledField';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({
    warningIcon: {
        backgroundColor: '#ffecd9',
    }
}));

export const WarningMessage = ({ label }) => {
    const classes = useStyles();

    return (
        <LabeledField label={label}>
            <WarningIcon className={classes.warningIcon}></WarningIcon>
        </LabeledField>
    )
};