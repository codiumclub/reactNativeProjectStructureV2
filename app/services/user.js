import { API_URL } from "../config/urls";
import * as HTTPRequest from "../lib/httpRequest";


//Dummy function for creating service (POST,UPDATE,DELETE)
function login(params = null) {
    return new Promise(function (resolve, reject) {
        HTTPRequest.Post(API_URL.login.endPoint, API_URL.login.url, params)
            .then(result => {
                resolve(result)
            }).catch(e => {
                reject(e)
            })
    })
}

//Dummy function for creating service (GET)
function getUserData(id = null) {
    return new Promise(function (resolve, reject) {
        HTTPRequest.Get(API_URL.getUserData.endPoint, API_URL.getUserData.url + '/' + id)
            .then(result => {
                resolve(result)
            }).catch(e => {
                reject(e)
            })
    })
}

export { login, getUserData }