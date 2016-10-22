import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import { toggleDrawer } from '../actions/ui'
import {Grid,Row} from 'react-inline-grid'

class Sidebar extends Component {

    static propTypes = {
        open: React.PropTypes.bool
    }

    render() {
        return (
            <Drawer open={this.props.open}>
                <Grid>
                    <div>
                        <Row is="end">
                            <IconButton onClick={this.props.toggleDrawer} style={{float: "right"}}>
                                <ArrowRight/>
                            </IconButton>
                        </Row>
                        <MenuItem primaryText="Hello World"/>
                        <MenuItem primaryText="Hello world"/>
                    </div>
                </Grid>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
