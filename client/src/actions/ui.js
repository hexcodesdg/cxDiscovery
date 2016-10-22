import { TOGGLE_DRAWER, TOGGLE_TAG_SELECTOR } from '../constants/ui.js'

export function toggleDrawer() {
    return {
        type: TOGGLE_DRAWER
    }
}

export function toggleTagSelector() {
    return {
        type: TOGGLE_TAG_SELECTOR
    }
}
