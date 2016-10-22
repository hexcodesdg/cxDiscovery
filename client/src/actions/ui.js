import { TOGGLE_DRAWER } from '../constants/ui.js'

export function toggleDrawer() {
    console.log("fired")
    return {
        type: TOGGLE_DRAWER
    }
}
