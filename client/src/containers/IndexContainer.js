import React, { Component } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import AdsList from '../components/AdsList'
import TagSelector from '../components/TagSelector'

export default class IndexContainer extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Sidebar/>
                <AdsList/>
                <TagSelector/>
            </div>
        )
    }
}
