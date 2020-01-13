import * as Utils from "./utils";

function Get( endPoint = '', url = '', headers = {}, isRaw = false, isJson = false ) {
    headers[ "authorization" ] = global.userData && global.userData.token || '';
    return new Promise( function ( resolve, reject ) {
        try {
            Utils.makeApiRequest( url, endPoint, {}, headers, "GET", isRaw, isJson )
                .then( result => {
                    if ( result ) {
                        resolve( result )
                    } else if ( result == false ) {
                        reject( false )
                    } else {
                        reject( false )
                    }
                } )
        } catch ( e ) {
            reject( e )
        }
    } )
}

function Post( endPoint = '', url = '', params = null, headers = {}, isRaw = false, isJson = true ) {
    headers[ "authorization" ] = global.userData && global.userData.token || '';
    return new Promise( function ( resolve, reject ) {
        try {
            Utils.makeApiRequest( url, endPoint, params, headers, "POST", isRaw, isJson )
                .then( result => {
                    if ( result ) {
                        resolve( result )
                    } else if ( result == false ) {
                        reject( false )
                    } else {
                        reject( false )
                    }
                } )
        } catch ( e ) {
            reject( e )
        }
    } )
}

function Put( endPoint = '', url = '', params = null, headers = {}, isRaw = false, isJson = true ) {
    headers[ "authorization" ] = global.userData && global.userData.token || '';
    return new Promise( function ( resolve, reject ) {
        try {
            Utils.makeApiRequest( url, endPoint, params, headers, "PUT", isRaw, isJson )
                .then( result => {
                    if ( result ) {
                        resolve( result )
                    } else if ( result == false ) {
                        reject( false )
                    } else {
                        reject( false )
                    }
                } )
        } catch ( e ) {
            reject( e )
        }
    } )
}

function Delete( endPoint = '', url = '', headers = {}, isRaw = false, isJson = true ) {
    headers[ "authorization" ] = global.userData && global.userData.token || '';
    return new Promise( function ( resolve, reject ) {
        try {
            Utils.makeApiRequest( url, endPoint, {}, headers, "DELETE", isRaw, isJson )
                .then( result => {
                    if ( result ) {
                        resolve( result )
                    } else if ( result == false ) {
                        reject( false )
                    } else {
                        reject( false )
                    }
                } )
        } catch ( e ) {
            reject( e )
        }
    } )
}
export { Get, Post, Put, Delete }