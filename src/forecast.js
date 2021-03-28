const request = require('postman-request')

 const forecast = (latitude,longitude,callback) =>{
      const url = 'http://api.weatherstack.com/current?access_key=8d658312b933043b681caf1300e862d9&query='+ encodeURIComponent(longitude)   +','+ encodeURIComponent(latitude)    +'&units=m'
        
      request({url , json:true},(error,{body}={}) =>{
        if(error){
            callback('unable to connect',undefined)
        }
         else if ( body.error) {
          callback('Location doesnot exist ',undefined)
         }
         else{
           callback(undefined,'It is '+body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out')
         }
    })

 }


 module.exports = forecast