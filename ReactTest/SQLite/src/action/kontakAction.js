
import { DELETE, fetch, GET, POST, PUT } from "../apis";
import { DELETECONTACT_FAIL, DELETECONTACT_SUCCESS, GETCONTACT_FAIL, GETCONTACT_SUCCESS, POSTCONTACT_SUCCESS, PUTCONTACT_FAIL, PUTCONTACT_SUCCESS } from "../utils";

export const getContact = (parameters) =>{
    return async dispatch=>{
        fetch(GET, 'contact', parameters)
            .then(response =>{
                dispatch({
                    type:GETCONTACT_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispatch({
                    type:GETCONTACT_FAIL,
                    payload:{
                        message: err
                    }
                })
            })
    }
}

export const postContact = (parameters) =>{
    console.log("semua data: "+JSON.stringify(parameters))
    return async dispatch=>{
        fetch(POST, 'contact', parameters)
            .then(response =>{
                dispatch({
                    type:POSTCONTACT_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispatch({
                    type:POSTCONTACT_SUCCESS,
                    payload:{
                        message: err
                    }
                })
            })
    }
}

export const putContact = (parameters) =>{
    console.log("semua data: "+JSON.stringify(parameters))
    var id = parameters.user_id;
    delete parameters.user_id
    return async dispatch=>{
        fetch(PUT, 'contact/'+id, parameters)
            .then(response =>{
                dispatch({
                    type:PUTCONTACT_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispatch({
                    type:PUTCONTACT_FAIL,
                    payload:{
                        message: err
                    }
                })
            })
    }
}

export const deleteContact = (parameters) =>{
    return async dispatch=>{
        fetch(DELETE, 'contact/'+parameters, parameters)
            .then(response =>{
                dispatch({
                    type:DELETECONTACT_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispatch({
                    type:DELETECONTACT_FAIL,
                    payload:{
                        message: err
                    }
                })
            })
    }
}