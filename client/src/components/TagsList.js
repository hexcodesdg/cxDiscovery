import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { toggleTag } from '../actions/tags'
import { hideSavedAds } from '../actions/ads'
import { connect } from 'react-redux'
import LocalOffer from 'material-ui/svg-icons/maps/local-offer'

class TagsList extends Component {

    render() {

        return (
            <div>
                {this.props.favTags.map((tag, index) => {
                    return <MenuItem key={index}
                        onClick={() => {
                            this.props.hideSavedAds()
                            this.props.toggleTag(tag)
                        }}
                        primaryText={tag}
                        rightIcon={this.props.currentTags.indexOf(tag) !== -1 ?
                            <LocalOffer/> : null}/>
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
        },
        hideSavedAds: () => {
            dispatch(hideSavedAds())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsList)
