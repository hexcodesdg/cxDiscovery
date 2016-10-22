import { SET_ADS, TOGGLE_AD_SAVE } from '../constants/ads'

export function fetchAds() {
    //perform http request to fetch ads
}

export function setAds(ads) {
    return {
        type: SET_ADS,
        ads
    }
}

export function toggleAdSave(id) {
    //perform http request
    return {
        type: TOGGLE_AD_SAVE,
        id: id
    }
}
