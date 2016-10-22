import { TOGGLE_TAG } from '../constants/tags'

export function toggleTag(tag) {
    return {
        type: TOGGLE_TAG,
        tag
    }
}
