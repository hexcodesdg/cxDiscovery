import React, { Component } from 'react'
import {Card, CardMedia, CardTitle, CardActions, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import TurnedIn from 'material-ui/svg-icons/action/turned-in'
import TurnedInNot from 'material-ui/svg-icons/action/turned-in-not'
import { Grid, Row, Cell } from 'react-inline-grid'
import Dialog from 'material-ui/Dialog'
import Chip from 'material-ui/Chip'
import {lime800} from 'material-ui/styles/colors'
import '../index.css'

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
        const imageStyle = {maxWidth: "600px", minWidth:"300px", cursor:"pointer"}
        const cardTitleStyle = {paddingBottom: 0, cursor:"pointer", maxWidth: "90%", display: "inline-flex", wordBreak: "break-word"}
        const cardTextStyle = {paddingTop: 0, fontStyle: 'Italic', color: 'rgba(125, 122, 122, 0.870588)', fontSize:"14px", cursor:"pointer"}
        const tagStyle = {maxWidth: "600px", minWidth:"300px", cursor:"pointer"}
        const actions = <div>
                          <IconButton style={{float:"left"}} iconStyle={{color:"#C1b49a"}} onClick={this.props.toggleSaved}>
                                {this.props.isSaved ?
                                    <TurnedIn/>
                                :
                                    <TurnedInNot/>
                                }
                          </IconButton>
                          <FlatButton primary={true} label="Close" labelStyle={{color:"#C1b49a"}} onTouchTap={this.onModalClose}/>
                        </div>

        return (
            <Row is="center">
                <div>
                    <Card
                        initiallyExpanded={true}>
                        <CardMedia onClick={() => {
                                this.setState({
                                    modalVisible: true
                                })
                                this.props.handleClick()
                        }}>
                            <img style={imageStyle} src={this.props.imageUrl}/>
                        </CardMedia>
                        <div style={{display: "inline-block", width: "100%"}}>
                          <CardTitle style={cardTitleStyle} title={this.props.title}/>
                          <IconButton style={{display: "inline-flex", float: "right"}} iconStyle={{color:"#C1b49a"}} onClick={this.props.toggleSaved}>
                                {this.props.isSaved ?
                                    <TurnedIn/>
                                :
                                    <TurnedInNot/>
                                }
                            </IconButton>
                        </div>
                        <CardText style={cardTextStyle}>
                            {this.props.body.substring(0, 50)}
                        </CardText>
                        <CardActions>
                            <Row>
                                {this.props.tags.map(tag => {
                                    return <Chip>{tag}</Chip>
                                })}
                            </Row>
                        </CardActions>
                    </Card>
                    <Dialog
                      title={this.props.title}
                      actions={actions}
                      modal={true}
                      contentStyle={{maxWidth: "650px"}}
                      onRequestClose={this.onModalClose}
                      open={this.state.modalVisible}
                      autoScrollBodyContent={true}
                    >
                        <div style={{maxWidth: "600px"}}>
                          <br />
                          <img style={imageStyle} src={this.props.imageUrl}/>
                          <br />
                          <div style={{padding: "5px"}}>
                            {this.props.body}
                          </div>
                        </div>
                    </Dialog>
                </div>
            </Row>
        )
    }
}
