import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'

class TagsList extends Component {

    render() {
        
        return (
            <div>
                {this.props.tags.map(tag => {
                    <MenuItem primaryText={tag}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tags: state.main.user.fav_tags
    }
}

export default connect()(TagsList)
