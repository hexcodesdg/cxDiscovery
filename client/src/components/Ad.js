import React, { Component } from 'react'
import {Card, CardMedia, CardTitle, CardActions, CardText, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import TurnedIn from 'material-ui/svg-icons/action/turned-in'
import TurnedInNot from 'material-ui/svg-icons/action/turned-in-not'
import { Row } from 'react-inline-grid'

export default class Ad extends Component {

    constructor(props) {
        super(props)

    }

    static propTypes = {
        imageUrl: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        body: React.PropTypes.string.isRequired,
        toggleSaved: React.PropTypes.func.isRequired,
        isSaved: React.PropTypes.bool.isRequired
    }

    render() {
        const imageStyle = {maxWidth: "600px", minWidth:"300px"}

        return (
            <Row is="center">
                <Card
                    initiallyExpanded={true}>
                    <CardMedia>
                        <img style={imageStyle} src={this.props.imageUrl}/>
                    </CardMedia>
                    <CardTitle title={this.props.title}/>
                    <CardText>
                        {this.props.body}
                    </CardText>
                    <CardActions>
                        <IconButton onClick={this.props.toggleSaved}>
                            {this.props.isSaved ?
                                <TurnedIn/>
                            :
                                <TurnedInNot/>
                            }
                        </IconButton>
                    </CardActions>
                </Card>
            </Row>
        )
    }
}
