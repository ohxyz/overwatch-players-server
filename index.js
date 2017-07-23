/* Pilot */

const https = require( 'https' );

console.log( 'Start...' );

class SiteResourceNotFoundError extends Error {
    
    constructor( statusCode) {  
        
        super();        
        
        this.message = 
            `Overwatch site resource not found. HTTP status code: ${ statusCode }.`;
    }
}

function handleResponse( response ) {
    
    let statusCode = response.statusCode;
    
    if ( statusCode === 404 ) {
        
        throw new SiteResourceNotFoundError( statusCode );
    }
    
    let rawData = '';
    
    response.on( 'data', ( chunk ) => { 

        rawData += chunk; 
    } );
    
    response.on( 'end', () => {
        
        try {
            
            let parsedData = JSON.parse( rawData );
        }
        catch ( error ) {
            
            console.error( 'Parse raw data error:', error.message );
        }
        
    } );
}

function getAccountByName( accountName ) {
    
    let accountByNameUrl = 
        `https://playoverwatch.com/en-us/search/account-by-name/${ accountName }`;
        
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