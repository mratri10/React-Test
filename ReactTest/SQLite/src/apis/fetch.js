import { GET, POST, UPLOAD, PUT, DELETE, POSTNOTOKEN } from "./constants";
import Axios from "axios";

let CancelToken = Axios.CancelToken

var cancel = () =>{};
export const cancelRequest = () => {
    return cancel
}
function getJsonBody(params){
    return params
}
export const fetch = (requestType, requestURL, parameters) =>{
    switch (requestType) {
        case GET:
            console.log('urlnya: '+requestType+" "+requestURL)
            return new Promise((resolve, reject) => {
                Axios.get("/"+ requestURL)
                .then(response =>{
                    console.log('respon'+response.data)
                    resolve(response.data);
                })
                .catch(error =>{
                    reject(error.response.data)
                })
            })
        case POST:
            return new Promise((resolve, reject) =>{
                var jsonBody = getJsonBody(parameters);
                Axios.post("/"+ requestURL, jsonBody, {
                    cancelToken: new CancelToken(function executor(c){
                        cancel = c
                    })
                })
                .then(response =>{
                    resolve(response.data)
                })
                .catch(error =>{
                    reject(error.response.data)
                })
            })
        case PUT:
            return new Promise((resolve, reject)=>{
                var jsonBody = getJsonBody(parameters);
                Axios.put("/"+requestURL, jsonBody,{
                    cancelToken: new CancelToken(function executor(c){
                        cancel = c
                    })
                })
                .then(response => {
                    resolve(response.data)
                })
                .catch(error =>{
                    reject(error)
                })
            })
        
        case DELETE: 
            return new Promise((resolve, reject) =>{
                console.log('urlnya: '+requestType+" "+requestURL+" "+JSON.stringify(parameters))
                var jsonBody = getJsonBody(parameters);
                Axios.delete("/"+ requestURL,{
                    data:jsonBody,
                    headers:{
                        "Content-Type": 'application/json'
                    },
                    cancelToken: new CancelToken(function executor(c){
                        cancel = c;
                    })
                })
                .then(response =>{
                    resolve(response.data)
                })
                .catch(error =>{
                    reject(error.response.data)
                })
            })
            
        default:
            break;
    }

}