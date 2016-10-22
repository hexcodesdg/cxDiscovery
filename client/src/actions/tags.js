import { TOGGLE_TAG, SET_FAV_TAGS } from '../constants/tags'

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
