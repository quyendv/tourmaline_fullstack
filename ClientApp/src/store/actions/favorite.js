import { actionTypes } from "./actionTypes"


export const setFavorite = (id) => ({
    type: actionTypes.SET_FAVORITE,
    id
}) 

export const removeFavorite = (id) => ({
    type: actionTypes.REMOVE_FAVORITE,
    id
})