import { actionTypes } from "../actions/actionTypes";


const initState  = {
    username: null
}


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERNAME:
            return {
                ...state,
                username: action.username,
            }
        default:
            return state
    }
}

export default userReducer
