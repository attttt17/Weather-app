const request = require('postman-request')

const geocode = (address,callback) =>{
    
    
    
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'  + encodeURIComponent(address)  + '.json?access_token=pk.eyJ1IjoiYXR1bHoiLCJhIjoiY2tta2g2ZTR0MTEyNTJ3cTRvejJpMzl0aSJ9.t7boMXlbKBHN9JoaGFPqjQ'
 

    request({url, json:true},(error,{body}={}) =>{
        if(error){
            callback('unable to connect',undefined)
        }
         else if ( body.features.length ===0) {
          callback('Location doesnot exist ',undefined)
         }
         else{
             callback(undefined,{
                 latitude: body.features[0].center[0],
                 longitude:  body.features[0].center[1],
                 location : body.features[0].place_name
             })
         }
    })

}



 

 module.exports = geocode