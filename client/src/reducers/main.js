import { TOGGLE_DRAWER, TOGGLE_TAG_SELECTOR } from '../constants/ui'
import { TOGGLE_TAG, SET_FAV_TAGS, TOGGLE_FAV_TAG } from '../constants/tags'
import { TOGGLE_AD_SAVE, SET_ADS, SET_SAVED_ADS, HIDE_SAVED_ADS, SHOW_SAVED_ADS } from '../constants/ads'
import update from 'react-addons-update'


const initialState = {
    isDrawerOpen: false,
    isTagSelectorOpen: false,
    savedAdsShown: false,
    ads: [],
    current_tags: [],
    user: {
        saved_ads: [],
        fav_tags: [],
    }
}

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
        case TOGGLE_TAG_SELECTOR:
            return update(state, {
                isTagSelectorOpen: {$set: !state.isTagSelectorOpen}
            })
        case TOGGLE_DRAWER:
            return update(state, {
                isDrawerOpen: {$set: !state.isDrawerOpen}
            })
        case TOGGLE_FAV_TAG:
            if (state.user.fav_tags.indexOf(action.tag) === -1) {
                return update(state, {
                    user: {
                        fav_tags: {$push: [action.tag]}
                    }
                })
            } else {
                const newFavTags = state.user.fav_tags.filter(tag => {
                    return tag !== action.tag
                })
                const newCurrentTags = state.current_tags.filter(tag => {
                    return tag !== action.tag
                })
                return update(state, {
                    user: {
                        fav_tags: {
                            $set: newFavTags
                        }
                    },
                    current_tags: {$set: newCurrentTags}
                })
            }
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
        case SET_FAV_TAGS:
            return update(state, {
                current_tags: {$set: action.tags},
                user: {
                    fav_tags: {$set: action.tags}
                }
            })
        case SET_SAVED_ADS:
            return update(state, {
                user: {
                    saved_ads: {$set: action.ads}
                }
            })
        case SHOW_SAVED_ADS:
            return update(state, {
                savedAdsShown: {$set: true}
            })
        case HIDE_SAVED_ADS:
            return update(state, {
                savedAdsShown: {$set: false}
            })
    }
}
