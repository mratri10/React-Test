import { DELETECONTACT_FAIL, DELETECONTACT_SUCCESS, GETCONTACT_FAIL, GETCONTACT_SUCCESS, POSTCONTACT_FAIL, POSTCONTACT_SUCCESS, PUTCONTACT_SUCCESS, PUTCONTACT_FAIL } from "../utils";

const initState = {
    get:null,
    post:null,
    put:null,
    delete:null,
    message:null
}
export default (state = initState, action) =>{
    switch (action.type) {
        case GETCONTACT_SUCCESS:
            return{
                get: action.payload
            }
        case POSTCONTACT_SUCCESS:
            return{
                post: action.payload
            }
        case PUTCONTACT_SUCCESS:
            return{
                put: action.payload
            }
        case DELETECONTACT_SUCCESS:
            return{
                delete: action.payload
            }
        
        case GETCONTACT_FAIL:
            return{
                message: action.payload.message
            }
        case POSTCONTACT_FAIL:
            return{
                message: action.payload.message
            }
        case PUTCONTACT_FAIL:
            return{
                message: action.payload.message
            }
        case DELETECONTACT_FAIL:
            return{
                message: action.payload.message
            }
    
        default:
            return state
    }
}