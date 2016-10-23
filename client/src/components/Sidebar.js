import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import Clear from 'material-ui/svg-icons/content/clear'
import { toggleDrawer, toggleTagSelector } from '../actions/ui'
import { hideSavedAds, showSavedAds} from '../actions/ads'
import TagsList from './TagsList'
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Divider from 'material-ui/Divider';
import TurnedIn from 'material-ui/svg-icons/action/turned-in'
import TurnedInNot from 'material-ui/svg-icons/action/turned-in-not'

class Sidebar extends Component {

    static propTypes = {
        open: React.PropTypes.bool
    }

    render() {
        return (
            <Drawer open={this.props.open} containerStyle={{width: "270px"}}>
                <MenuItem
                    style={{fontWeight: "bold", marginBottom: "10px"}}
                    primaryText="Tags"
                    rightIcon={<Clear onClick={this.props.toggleDrawer}/>}
                    leftIcon={this.props.savedAdsShown ? <TurnedIn color="#C1b49a" onClick={this.props.hideSavedAds}/> : <TurnedInNot color="#C1b49a" onClick={() => {
                        console.log("clicked")
                        this.props.showSavedAds()
                    }}/>}
                />
                <TagsList/>
                <Divider style={{marginTop: "10px"}}/>
                <MenuItem primaryText="show more tags" onClick={this.props.toggleTagSelector} rightIcon={<ArrowDown/>}/>
            </Drawer>
        )
    }
}

const mapStateToProps = state => {
    return {
        open: state.main.isDrawerOpen,
        savedAdsShown: state.main.savedAdsShown
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDrawer: () => {
            dispatch(toggleDrawer())
        },
        toggleTagSelector: () => {
            dispatch(toggleTagSelector())
        },
        hideSavedAds: () => {
            dispatch(hideSavedAds())
        },
        showSavedAds: () => {
            dispatch(showSavedAds())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
