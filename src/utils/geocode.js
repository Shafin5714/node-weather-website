const request = require('request')


const geocode =(address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hhZmluNTcxNCIsImEiOiJjazA4MnkwcWs0NmtrM2NwZnFhbHk0dGUzIn0.VO4QK9EdBIbgWsbaw4w3gg&limit=1`

    request({url : url,json:true},(error,{body} )=>{    //response
        if(error){
            callback("Unable to connect to location services",undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location, Try another search',undefined);
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],//response.body.features[0].center[1]
                longitude:body.features[0].center[0],    //sending back object
                location :body.features[0].place_name  



            })
        }
        
    })
}

module.exports= geocode;