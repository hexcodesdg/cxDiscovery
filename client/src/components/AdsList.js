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
        //filters out ads by currentTags
        // const renderedAds = this.props.ads.filter(ad => {
        //     for (let i = 0; i < ad.tags.length; i++) {
        //         const tag = ad.tags[i]
        //         if (this.props.currentTags.indexOf(tag) !== -1) {
        //             return true
        //         }
        //     }
        //     return false
        // })

        return (
            <Grid>
                <Ad
                    title="test"
                    body="asdijandaisdn"
                    imageUrl="http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg"
                />
            </Grid>
        )
    }
}

// {renderedAds.map(ad => {
//     <Ad
//         title={ad.title}
//         body={ad.body}
//         imageUrl={this.props.image_url}
//         isSaved={this.props.userAds.indexOf(ad._id) != -1}
//         toggleSaved={() => {
//             this.props.toggleAdSave(ad._id)
//         }}
//     />
// })}

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
