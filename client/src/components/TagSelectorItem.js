import React, { Component } from 'react'
import {GridTile} from 'material-ui/GridList'
import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import IconButton from 'material-ui/IconButton'

export default class TagSelectorItem extends Component {

    render() {

        return (
            <GridTile
                title={this.props.title}
                actionIcon={<IconButton onClick={this.props.handleClick}>
                    {this.props.toggled ?
                        <Favorite/>
                    :
                        <FavoriteBorder/>
                    }
                </IconButton>}/>
        )
    }
}
