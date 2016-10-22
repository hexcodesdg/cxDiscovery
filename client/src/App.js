import React, { Component } from 'react';
import baseTheme from './theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux'
import { getUserInfo } from './actions/ads'
import "./index.css"

class App extends Component {

    componentWillMount() {
        this.props.getUserInfo()
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(baseTheme)
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserInfo: () => {
            dispatch(getUserInfo())
        }
    }
}

export default connect(null, mapDispatchToProps)(App);
