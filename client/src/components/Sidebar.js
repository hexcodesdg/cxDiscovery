import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Clear from 'material-ui/svg-icons/content/clear'
import { toggleDrawer, toggleTagSelector } from '../actions/ui'
import TagsList from './TagsList'
import Paper from 'material-ui/Paper'
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Divider from 'material-ui/Divider';

class Sidebar extends Component {

    static propTypes = {
        open: React.PropTypes.bool
    }

    render() {
        return (
            <Drawer open={this.props.open} containerStyle={{width: "270px"}}>
                <MenuItem style={{fontWeight: "bold", marginBottom: "10px"}} primaryText="Favourite Tags" rightIcon={<Clear onClick={this.props.toggleDrawer}/>}/>
                <TagsList/>
                <Divider style={{marginTop: "10px"}}/>
                <MenuItem primaryText="show more tags" onClick={this.props.toggleTagSelector} rightIcon={<ArrowDown/>}/>
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        open: state.main.isDrawerOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: () => {
            dispatch(toggleDrawer())
        },
        toggleTagSelector: () => {
            dispatch(toggleTagSelector())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
