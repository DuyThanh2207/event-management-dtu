var redux = require('redux');
const toggledInitialState = {
    statusToggled: true,
}
const statusToggle = (state = toggledInitialState, action) => {
    switch (action.type) {
        case "CHANGE_TOGGLE":
            return {...state, statusToggled: !state.statusToggled }
        default:
            return state
    }
}
const store = redux.createStore(statusToggle);
export default store;