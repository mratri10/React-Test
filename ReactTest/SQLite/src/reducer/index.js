import kontakReducer from "./kontakReducer"

const { combineReducers } = require("redux")

const initState = {
    data:[]
}

const dataReducer = (state = initState, action) =>{
    switch(action.type){
        default: return state
    }
}

const rootReducer = combineReducers({
    dataReducer,
    kontak: kontakReducer
})

export default rootReducer;