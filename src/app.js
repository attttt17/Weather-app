const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./forecast')
const geocode = require('./geocode')

const app = express()
const port = process.env.PORT || 3000
// Define paths for  Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Atul Singh'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Section',
        name : 'Atul Singh'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Atul Singh'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
             error:'You must provide search '
         })
      }
      geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
      
        if(error){
            return res.send({error})
        }
        
    
    
         forecast(latitude,longitude,(error,forecastdata)=>{
              if(error){
                  return res.send({error})
              }
             res.send({
                 forecast:forecastdata,
                 location,
                 address:req.query.address
             })
        })


      })

      
    
})



app.get('/help/*', (req,res) => {
    res.render('error',{
        title : 'Help page not found !',
        name : 'Sunshine boy'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        title : '404 Error',
        name : 'Sunshine boy'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})