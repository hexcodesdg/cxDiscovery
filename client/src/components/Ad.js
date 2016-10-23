import React, { Component } from 'react'
import {Card, CardMedia, CardTitle, CardActions, CardText, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import TurnedIn from 'material-ui/svg-icons/action/turned-in'
import TurnedInNot from 'material-ui/svg-icons/action/turned-in-not'
import { Row, Cell } from 'react-inline-grid'
import Dialog from 'material-ui/Dialog'
import Chip from 'material-ui/Chip'

export default class Ad extends Component {

    state = {
        modalVisible: false
    }

    constructor(props) {
        super(props)
        this.onModalClose = this.onModalClose.bind(this)
    }

    static propTypes = {
        imageUrl: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        body: React.PropTypes.string.isRequired,
        toggleSaved: React.PropTypes.func.isRequired,
        isSaved: React.PropTypes.bool.isRequired,
        tags: React.PropTypes.array.isRequired,
        handleClick: React.PropTypes.func.isRequired
    }

    onModalClose() {
        this.setState({
            modalVisible: false
        })
    }

    render() {
        const imageStyle = {maxWidth: "600px", minWidth:"400px", margin: "auto", display: "block"}
        const actions = <FlatButton primary={true} label="Close" onTouchTap={this.onModalClose}/>

        return (
            <Row is="center">
                <div>
                    <Card
                        initiallyExpanded={true}>
                        {this.props.vendor_url && this.props.vendor_name &&
                            <CardHeader
                                title={this.props.vendorName}
                                avatar={this.props.vendorUrl}
                                />
                        }
                        <CardMedia onClick={() => {
                                this.setState({
                                    modalVisible: true
                                })
                                this.props.handleClick()
                        }}>
                            <img style={imageStyle} src={this.props.imageUrl}/>
                        </CardMedia>
                        <CardTitle title={this.props.title}/>
                        <CardText>
                            {this.props.body.substring(0, 50)}
                        </CardText>
                        <CardActions>
                                <Row>
                                    {this.props.tags.map(tag => {
                                        return <Chip style={{borderRadius: 0}}>{tag}</Chip>
                                    })}
                                </Row>
                                <IconButton onClick={this.props.toggleSaved}>
                                 {this.props.isSaved ?
                                     <TurnedIn/>
                                 :
                                     <TurnedInNot/>
                                 }
                             </IconButton>
                        </CardActions>
                    </Card>
                    <Dialog
                      title={this.props.title}
                      actions={actions}
                      modal={true}
                      contentStyle={{width: "100%"}}
                      onRequestClose={this.onModalClose}
                      open={this.state.modalVisible}
                      autoScrollBodyContent={true}
                    >
                        <Cell is="middle 6">
                            <img style={imageStyle} src={this.props.imageUrl}/>
                        </Cell>
                          {this.props.body}
                    </Dialog>
                </div>
            </Row>
        )
    }
}
