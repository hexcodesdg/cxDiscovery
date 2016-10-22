import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { toggleTag } from '../actions/tags'
import { connect } from 'react-redux'
import LocalOffer from 'material-ui/svg-icons/maps/local-offer'

class TagsList extends Component {

    render() {

        return (
            <div>
                {this.props.favTags.map((tag, index) => {
                    return <MenuItem key={index}
                        onClick={() => {
                            this.props.toggleTag(tag)
                        }}
                        primaryText={tag}
                        leftIcon={this.props.currentTags.indexOf(tag) !== -1 &&
                            <LocalOffer/>}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        favTags: state.main.user.fav_tags,
        currentTags: state.main.current_tags
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTag: (tag) => {
            dispatch(toggleTag(tag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList)
