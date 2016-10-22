import { TOGGLE_TAG, SET_FAV_TAGS, TOGGLE_FAV_TAG } from '../constants/tags'
import { API_URL, USER_ID } from '../constants/config'
import axios from 'axios'

export function toggleTag(tag) {
    return {
        type: TOGGLE_TAG,
        tag
    }
}

export function setFavTags(tags) {
    return {
        type: SET_FAV_TAGS,
        tags
    }
}

export function toggleFavTag(tag) {
    console.log("entered")
    axios.post(API_URL + "/tags", {
        user_id: USER_ID,
        fav_tag: tag
    }).then(result => {
        console.log(result.data)
    })
    return {
        type: TOGGLE_FAV_TAG,
        tag
    }
}
