const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/4ca91178337561d699e7565461ae92c9/${latitude},${longitude}?units=si`

     request ({
        url, ///url:url
        json: true
    }, (error,{body}) => {  //response
        if (error) {
            callback("Unable to connect to weather service",undefined);


        } else if (body.error) {//response.body.error
            callback('Unable to find location',undefined);

        } else {
            callback(undefined,`${body.daily.data[0].summary} This is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability} % chance of rain`)

        }
    })
}

module.exports = forecast;