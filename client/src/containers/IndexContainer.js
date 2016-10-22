import React, { Component } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default class IndexContainer extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Sidebar/>
            </div>
        )
    }
}
