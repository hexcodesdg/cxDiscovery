import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ad from './Ad'
import { fetchAds, toggleAdSave} from '../actions/ads'
import { Grid } from 'react-inline-grid'

class AdsList extends Component {

    static propTypes = {
        ads: React.PropTypes.array
    }

    componentWillMount() {
        this.props.fetchAds()
    }

    render() {
        // filters out ads by currentTags
        let renderedAds = this.props.ads
        if (this.props.currentTags.length > 0) {
            renderedAds = this.props.ads.filter(ad => {
                for (let i = 0; i < ad.tags.length; i++) {
                    const tag = ad.tags[i]
                    if (this.props.currentTags.indexOf(tag) !== -1) {
                        return true
                    }
                }
                return false
            })
        }
        console.log(this.props.currentTags)

        return (
            <Grid>
                <div>
                    {renderedAds.map(ad => {
                        return <Ad
                            key={ad._id}
                            title={ad.title}
                            body={ad.body}
                            tags={ad.tags}
                            imageUrl={ad.image_url}
                            isSaved={this.props.userAds.indexOf(ad._id) !== -1}
                            toggleSaved={() => {
                                this.props.toggleAdSave(ad._id)
                            }}
                            handleClick={() => {
                                console.log("clicked")
                            }}
                        />
                    })}
                </div>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAds: () => {
            dispatch(fetchAds())
        },
        toggleAdSave: id => {
            dispatch(toggleAdSave(id))
        }
    }
}

const mapStateToProps = state => {
    return {
        ads: state.main.ads,
        userAds: state.main.user.saved_ads,
        currentTags: state.main.current_tags
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsList)
