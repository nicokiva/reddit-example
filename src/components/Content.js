import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { SideBar } from './SideBar';

const Component = (props) => {
    useEffect(() => {
       props.openSidebar();
    });

    return <>
        <SideBar />
    </>
};

const mapStateToProps = (state) => ({
    user: state.currentUer
})

  
const mapDispatchToProps = (dispatch) => ({
    openSidebar: (userObj) => {
        dispatch(actions.openSidebar(userObj))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);