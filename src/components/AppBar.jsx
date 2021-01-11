import React from 'react';
import AppBarMaterial from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { openSideBar, closeSideBar } from '../actions';

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
    }
}));

const AppBarInner = ({ sideBarIsOpen, openSideBar, closeSideBar }) => {
    const classes = useStyles();

    return (
        <AppBarMaterial className={classes.root}>
            <Toolbar>
                <IconButton
                    className={`${classes.button} ${sideBarIsOpen ? 'is-opened' : ''}`}
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={sideBarIsOpen ? closeSideBar : openSideBar}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBarMaterial>
    )
};

const mapStateToProps = ({ appReducer }) => ({ ...appReducer });
  
const mapDispatchToProps = dispatch => ({
    openSideBar: () => dispatch(openSideBar()),
    closeSideBar: () => dispatch(closeSideBar())
});

export const AppBar = connect(mapStateToProps, mapDispatchToProps)(AppBarInner);