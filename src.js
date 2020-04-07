const path = require("path")
const express = require("express")
const hbs = require("hbs")
const request = require('request')
const utils = require('./utils.js')

const app = express()

const port = process.env.PORT || 3000
//Definepaths for express configuration
const viewsPath = path.join(__dirname,'/template/views') 
const partialsPath = path.join(__dirname,'/template/partials')

//Setup handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname,'/public')))

app.get('',(req,res) => {
    res.render('index',{   
        title : "Weather",
        name: "Atharva"
    })
})



app.get('/about',(req,res) => {
    res.render('about',{
        name:'Atharva',
        age:18
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        name:'Atharva',
        content:'help'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send("Please enter the address to fetch weather data")
    }
    const command = req.query.address
    utils.geoCode(command,(error,data) => {
        if(error){
            return res.send({Error:error})
        }
        
        utils.forecast(data.latitude, data.longitude, (error, foreCastData) => {
            if(error){
                return res.send({Error:error})
            }
            res.send({
                Location : data.location,
                Temperature : foreCastData      
            })
        })
        
    })
})
app.get('*',(req,res) => {
    res.send("This my error page:")
})    
app.listen(port,() => {
    console.log("Server is up on port: "+port)
}) 
