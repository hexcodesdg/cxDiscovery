import { SET_ADS, TOGGLE_AD_SAVE, SET_SAVED_ADS } from '../constants/ads'
import { setFavTags } from './tags'
import { API_URL, USER_ID } from '../constants/config'
import axios from 'axios'

export function fetchAds() {
    return function(dispatch) {
        axios.get(API_URL + "/ads", {
            params: {
                user_id: USER_ID
            }
        }).then(result => {
            const ads = result.data.data
            return dispatch(setAds(ads))
        })
    }
}

export function setAds(ads) {
    return {
        type: SET_ADS,
        ads
    }
}

export function setSavedAds(ads) {
    return {
        type: SET_SAVED_ADS,
        ads
    }
}

export function toggleAdSave(id) {
    axios.post(API_URL + "/ads", {
            user_id: 1,
            saved_ad: id
    }).then(result => {
        console.log(result.data)
        console.log("toggle propogated to server")
    })
    return {
        type: TOGGLE_AD_SAVE,
        id: id
    }
}

export function getUserInfo() {
    return function(dispatch) {
        axios.get(API_URL + "/user", {
            params: {
                user_id: USER_ID
            }
        }).then(result => {
            const data = result.data.data
            dispatch(setSavedAds(data.saved_ads))
            dispatch(setFavTags(data.fav_tags))
        })
    }
}
