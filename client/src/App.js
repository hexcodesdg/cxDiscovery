import React, { Component } from 'react';
import baseTheme from './theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import "./index.css"

class App extends Component {

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

export default App;
