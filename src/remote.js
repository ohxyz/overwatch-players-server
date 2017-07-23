/* Handle remote resources */

const https = require( 'https' );

/**
 * Define the error when site resouce is not found, eg. a wrong url
 * 
 * @override
 * @this {SiteResourceNotFoundError}
 */
class SiteResourceNotFoundError extends Error {
    
    constructor() {  
        
        super();        
        this.message = 'Overwatch site resource not found.';
    }
}

/**
 * Check HTTP repsonse status code and do things as per status code
 * 
 * @param {number} - Standard HTTP status code.
 */
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

function handleGetAccountByNameResponse( response ) {
    
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

/**
 * Get account info by playerName
 *
 * @param {string} - playerName The name of player, case sensitive
 *                   eg. player1 and Player1 are two players.
 * @return {undefined}     
 */
function getAccountByName( playerName ) {
    
    let accountByNameUrl = 
        `https://playoverwatch.com/en-us/search/account-by-name/${playerName}`;
        
    https
        .get( accountByNameUrl, ( response ) => {
            
            try {
                
                handleGetAccountByNameResponse( response );
            }
            catch ( error ) {
                
                console.error( error );
            }

        } )
        .on( 'error', ( error ) => {
            
            console.error( 'Check for uncaught errors.', error );
        } );
}


/**
 * Get player's data, eg. rank, avatar, eliminations-average, time-played ...
 *
 * @param {string} playerName - The name of the player, case sensitive
 * @param {string} platform - Must be one of pc, psn or xb1
 * @param {string} region - Must be one of us, eu, kr or global
 * @return {undefined}
 */
function getPlayerData( playerName, platform, region ) {
    
    let playerPageUrl = 
        `https://playoverwatch.com/en-us/career/${platform}/${region}/${playerName}`;
        
    
}


module.exports = {
    
    getAccountByName
};