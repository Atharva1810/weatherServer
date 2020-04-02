const request = require("request")

const geoCode = (address, callback) => {
    request({url:"https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiYXRoYXJ2YWRlcmUxMDE4IiwiYSI6ImNrODJtdDBmMDA3YTgzbHFrZHV2MWxzenYifQ.6hGuEP7VmwXfVi3KQLy16A",json :true},(error,response) => {
        if(error){
            callback(error,undefined)
        }
        else if(response.body.features.length == 0){
            callback(error,undefined)
        }
        else{
            const data ={
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}
const forecast = (a,b,callback) => {
    request({url:"https://api.darksky.net/forecast/9a75c3fe09e23b1be6e44d4dc49e4bfe/"+a+","+b,json:true},(error,response) => {
        if(error){
            callback("Check your network connection",undefined)
        }
        else if(response.body.error == 0){
            callback("Check your entered location",undefined)
        }
        else{
            const data = response.body.currently.temperature
            callback(NaN,data)
        }
    })
}
module.exports = {
    geoCode:geoCode,
    forecast:forecast
}
