import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton'

export default class Header extends Component {

    render() {

        return (
            <div>
                <AppBar
                    title="cxDiscovery"
                    iconElementLeft={<IconButton></IconButton>}
                />
            </div>
        )
    }
}
