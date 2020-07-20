const request = require('request');

const forecast = ({latitude,longitude}, callback) => {
    
    var Weatheroptions = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather?units=metric',
        qs: {
          lat: latitude,
          lon: longitude,
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': 'e6aa1d7bd7msh1543c42761e9d8ap127dc6jsn138af7ab78c0',
          useQueryString: true
        },
        json:true
    }

    request(Weatheroptions, (error, {body}) => {

        if(error)
        {
            callback('Unable to get to Weather services', undefined);
        }

        else if(body.cod === "400")
        {
            callback('Please provide correct location', undefined);
        }

        else
        {
            callback(undefined, body.main);
        }
    })
}

module.exports = forecast;