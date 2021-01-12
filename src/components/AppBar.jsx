import React from 'react';
import AppBarMaterial from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { connect } from 'react-redux';
import { openSideBar, closeSideBar, clearAll } from '../actions';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: 'rgb(255, 69, 0)',
        '&:hover': {
            backgroundColor: 'rgb(255, 69, 0)',
            opacity: 0.7
        },
        '&.is-opened': {
            backgroundColor: 'rgb(204, 55, 0)'
        }
    },
    clearAll: {
        marginLeft: '10px',
        width: '48px',
    },
    sideBarHandlerContainer: {
        transition: 'width 1s',
        width: '48px',
        overflow: 'hidden',
        display: 'flex',
        '&.is-opened': {
            width: '106px'
        }
    }
}));

const AppBarInner = ({ sideBarIsOpen, openSideBar, closeSideBar, clearAll }) => {
    const classes = useStyles();

    const handleClearAll = () => clearAll()

    return (
        <AppBarMaterial className={classes.root}>
            <Toolbar>
                <div className={`${classes.sideBarHandlerContainer} ${sideBarIsOpen ? 'is-opened' : ''}`}>
                    <IconButton
                        className={`${classes.button} ${sideBarIsOpen ? 'is-opened' : ''}`}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={sideBarIsOpen ? closeSideBar : openSideBar}
                    >
                        <MenuIcon />
                    </IconButton>

                    <IconButton
                        className={`${classes.button} ${classes.clearAll}`}
                        color="inherit"
                        aria-label="clear all"
                        onClick={handleClearAll}
                    >
                        <ClearAllIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBarMaterial>
    )
};

const mapStateToProps = ({ appReducer }) => ({ ...appReducer });
  
const mapDispatchToProps = dispatch => ({
    openSideBar: () => dispatch(openSideBar()),
    closeSideBar: () => dispatch(closeSideBar()),
    clearAll: () => dispatch(clearAll())
});

export const AppBar = connect(mapStateToProps, mapDispatchToProps)(AppBarInner);