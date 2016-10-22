import { TOGGLE_DRAWER } from '../constants/ui'
import { TOGGLE_TAG } from '../constants/tags'
import { TOGGLE_AD_SAVE, SET_ADS } from '../constants/ads'
import update from 'react-addons-update'


const initialState = {
    isDrawerOpen: false,
    ads: [],
    current_tags: [],
    user: {
        user_id: 1,
        saved_ads: [],
        fav_tags: [],
    }
}

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
        case TOGGLE_DRAWER:
            return update(state, {
                isDrawerOpen: {$set: !state.isDrawerOpen}
            })
        case TOGGLE_AD_SAVE:
            if (state.user.saved_ads.indexOf(action.id) === -1) {
                return update(state, {
                    user: {
                        saved_ads: {$push: [action.id]}
                    }
                })
            } else {
                const newSavedAds = state.user.saved_ads.filter(id => {
                    return id !== action.id
                })
                return update(state, {
                    user: {
                        saved_ads: {
                            $set: newSavedAds
                        }
                    }
                })
            }
        case SET_ADS:
            return update(state, {
                ads: {
                    $set: action.ads
                }
            })
        case TOGGLE_TAG:
            if (state.current_tags.indexOf(action.tag) === -1) {
                return update(state, {
                    current_tags: {$push: [action.tag]}
                })
            } else {
                return update(state, {
                    current_tags: {$set: state.current_tags.filter(tag => {
                        return tag !== action.tag
                    })}
                })
            }
    }
}
