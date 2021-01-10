import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LabeledField } from './LabeledField';

export const LoadingSpinner = ({ label }) => {
    return (
        <LabeledField label={label}>
            <CircularProgress />
        </LabeledField>
    );
};