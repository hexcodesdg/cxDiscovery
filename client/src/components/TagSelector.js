import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { toggleTagSelector } from '../actions/ui'
import { connect } from 'react-redux'

class TagSelector extends Component {

    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {

    }

    render() {
        const actions = <FlatButton label="Submit" primary={true} onTouchTap={this.handleClose} />

        return (
            <Dialog
                title="Available Tags"
                onRequestClose={this.handleClose}
                autoScrollBodyContent={true}
                open={this.props.open}
                actions={actions}
            >
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        open: state.main.isTagSelectorOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTagSelector: () => {
            dispatch(toggleTagSelector())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSelector)
