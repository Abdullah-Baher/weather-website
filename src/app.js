const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname,'../public');
const viewpath = path.join(publicDirectoryPath, './views')
const partialsPath = path.join(publicDirectoryPath,'./partials');

app.set('views',viewpath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));


app.get('', (req,res) => {

    res.render('index', {
        title:'Given HBS TITLE!',
        name:'Baher'
    });
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'HBS About Page',
        name:'Baher'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'HBS Help page',
        name:'Baher'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address)
    {
        return res.send({
            error:'Please Provide an address'
        })
    }
    
    geoCode(req.query.address,(error,geodata) => {
        
        if(error)
        {
            return res.send({
                error
            })
        }

        forecast(geodata,(error, {temp}) => {
            
            if(error)
            {
                return res.send({
                    error
                })
            }
            return res.send({
                Location:geodata.location,
                Temperature: temp
            })
            
        })
    });
})

app.get('/help/*', (req, res) => {
    res.render('Error404',{
        title:'404',
        message:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('Error404', {
        title:'404',
        message:'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Your Server is up on port 3000')
})