import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { toggleTagSelector } from '../actions/ui'
import { toggleFavTag } from '../actions/tags'
import {GridList} from 'material-ui/GridList'
import { connect } from 'react-redux'
import TagSelectorItem from './TagSelectorItem'

import beauty from '../img/beauty.jpg'
import electronics from '../img/electronics.jpg'
import travel from '../img/travel.jpg'
import events from '../img/events.jpg'
import fashion from '../img/fashion.jpg'
import home from '../img/home.jpg'
import cards from '../img/cards.jpg'
import wine from '../img/wine.jpg'
import featured_products from '../img/featured_products.jpg'

const tagMap = {
    "Featured products": featured_products,
    "Travel": travel,
    "Gourmet and Wine": wine,
    "Entertainment and Events": events,
    "Electronics and Accessories": electronics,
    "Beauty, Health and Personal Care": beauty,
    "Fashion, Apparel and Sports": fashion,
    "Home and Kids": home,
    "Gift Cards and Miles Conversion": cards,
    "Social Goods": wine
}

// const tagList = ['Featured products', 'Travel', 'Gourmet and Wine', 'Entertainment and Events', 'Electronics and Accessories',
//                   'Beauty, Health and Personal Care', 'Fashion, Apparel and Sports', 'Home and Kids',
//                   'Gift Cards and Miles Conversion', 'Social Goods'
//                  ];

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
                    {Object.keys(tagMap).map((tag, index) => {
                        return <TagSelectorItem
                                key={index}
                                title={tag}
                                img={tagMap[tag]}
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
