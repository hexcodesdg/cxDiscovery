import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import {toggleDrawer} from '../actions/ui'
import { connect } from 'react-redux'

class Header extends Component {

    render() {
        const menuButton = (
            <IconButton
                onClick={() => {
                    this.props.toggleDrawer()
                }}
                ><Menu/></IconButton>)

        return (
            <div>
                <AppBar
                    title="cxDiscovery"
                    iconElementLeft={menuButton}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDrawer: () => {
            dispatch(toggleDrawer())
        }
    }
}

export default connect(null, mapDispatchToProps)(Header)
