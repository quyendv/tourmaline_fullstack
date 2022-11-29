const {actionTypes} = require("../actions/actionTypes")

const initState = {
    setIsOpenModal: function () {
        return 0
    }
}

const actionsReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_OPEN_MODAL:
            return {
                ...state,
                setIsOpenModal: action.setIsOpenModal
            }
        default:
            return state
    }
}

export default actionsReducer