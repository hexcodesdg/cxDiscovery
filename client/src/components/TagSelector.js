import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { toggleTagSelector } from '../actions/ui'
import { toggleFavTag } from '../actions/tags'
import {GridList} from 'material-ui/GridList'
import { connect } from 'react-redux'
import TagSelectorItem from './TagSelectorItem'

// const tagMap = {
//     "Featured products":,
//     "Travel":
//     "Gourmet and Wine":
//     "Entertainment and Events":
//     "Electronics and Accessories":
//     "Beauty, Health and Personal Care":
//     "Fashion, Apparel and Sports":
//     "Home and Kids":
//     "Gift Cards and Miles Conversion":
//     "Social Goods":
// }

const tagList = ['Featured products', 'Travel', 'Gourmet and Wine', 'Entertainment and Events', 'Electronics and Accessories',
                  'Beauty, Health and Personal Care', 'Fashion, Apparel and Sports', 'Home and Kids',
                  'Gift Cards and Miles Conversion', 'Social Goods'
                 ];

class TagSelector extends Component {

    state = {}

    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose() {
        this.props.toggleTagSelector()
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
                <GridList style={{display: "flex", justifyContent: "center"}}>
                    {tagList.map((tag, index) => {
                        return <TagSelectorItem
                                key={index}
                                title={tag}
                                handleClick={() => {
                                    this.props.toggleFavTag(tag)
                                }}
                                toggled={this.props.fav_tags.indexOf(tag) !== -1}
                            />
                    })}
                </GridList>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    return {
        open: state.main.isTagSelectorOpen,
        fav_tags: state.main.user.fav_tags
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTagSelector: () => {
            dispatch(toggleTagSelector())
        },
        toggleFavTag: (tag) => {
            dispatch(toggleFavTag(tag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagSelector)
