/* Pilot */

const https = require( 'https' );

console.log( 'Start...' );

class SiteResourceNotFoundError extends Error {
    
    constructor() {  
        
        super();        
        this.message = 'Overwatch site resource not found.';
    }
}

function checkStatusCode( code = 200 ) {
    
    if ( code === 200 ) {
        
        return;
    }
    else if ( code === 404 ) {
        
        throw new SiteResourceNotFoundError( code );
    }
    else {
        
        console.log( `Response status code: ${ code }` );
    }
    
}

function handleResponse( response ) {
    
    checkStatusCode( response.statusCode );

    let rawData = '';
    
    response.on( 'data', ( chunk ) => { 

        rawData += chunk; 
    } );
    
    response.on( 'end', () => {
        
        try {
            
            let parsedData = JSON.parse( rawData );
            
            console.log( 1, parsedData );
        }
        catch ( error ) {
            
            console.error( 'Parse raw data error:', error.message );
        }
        
    } );
}

function getAccountByName( accountName ) {
    
    let accountByNameUrl = 
        `https://playoverwatch.com/en-us/search/account-by-name1/${ accountName }`;
        
    https
        .get( accountByNameUrl, ( response ) => {
            
            try {
                
                handleResponse( response );
            }
            catch ( error ) {
                
                console.error( error );
            }

        } )
        .on( 'error', ( error ) => {
            
            console.error( 'Check for uncaught errors.', error );
        } );
}

let accountName = 'ShaDowBurn-2301';

getAccountByName( accountName );