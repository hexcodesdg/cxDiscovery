import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ad from './Ad'
import { fetchAds, toggleAdSave} from '../actions/ads'
import { Grid } from 'react-inline-grid'
import axios from 'axios'
import { API_URL, USER_ID } from '../constants/config'


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
        console.log(this.props.userAds)
        if (this.props.savedAdsShown) {
            renderedAds = this.props.ads.filter(ad => {
                return this.props.userAds.indexOf(ad._id) !== -1
            })
        } else if (this.props.currentTags.length > 0) {
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

        return (
            <Grid>
                <div>
                    {renderedAds.map(ad => {
                        return <Ad
                            key={ad._id}
                            title={ad.title}
                            body={ad.body}
                            tags={ad.tags}
                            vendorUrl={ad.vendor_url}
                            vendorName={ad.vendor_name}
                            imageUrl={ad.image_url}
                            isSaved={this.props.userAds.indexOf(ad._id) !== -1}
                            toggleSaved={() => {
                                this.props.toggleAdSave(ad._id)
                            }}
                            handleClick={() => {
                                axios.post(API_URL +"/click/"+USER_ID, {
                                    ad_id: ad._id
                                })
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
        currentTags: state.main.current_tags,
        savedAdsShown: state.main.savedAdsShown
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsList)
