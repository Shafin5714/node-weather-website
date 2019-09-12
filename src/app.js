const path = require('path')
const express = require('express') ///express is a function
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));


const app = express() // variable to store express application
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './Templates/views')
const partialsPath = path.join(__dirname, './Templates/partials')


// Setup Handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Shafin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Shafin'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help!!",
        name: 'Shafin'
    })
})





// app.get('',(req,res)=>{  //'' = root of website
//     res.send('<h1>Weather</h1>')  //for browser
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Andrew',
//         age:27
//     },{
//         name:'Shafin',
//         age:22
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
            if(!req.query.address) {
                return res.send({
                    error: 'You Must Provide an Address'
                })
            }

            geocode(req.query.address, (error, {
                latitude,
                longitude,
                location
            } = {} ) => {
                if(error){
                    return res.send({error})
                }

                forecast(latitude, longitude, (error, forecastData)=> {
                    // if(error){
                    //     return res.send({error})
                    // }
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                })
      })
})


            //     res.send({
            //         forecast:'It is snowing',
            //         location:"Philadelphia",
            //         address: req.query.address
            //     })
             

            app.get('/products', (req, res) => {

                if (!req.query.search) {
                    return res.send({
                        error: 'You Must Provide a Search term'
                    })


                }
                console.log(req.query.search)


                res.send({
                    products: []
                })
            })




            app.get('/help/*', (req, res) => {
                res.render('404', {
                    title: '404 help',
                    name: 'Shafin',
                    errorMessage: 'help article not found'
                })
            })


            app.get('*', (req, res) => {
                res.render('404', {
                    title: '404',
                    name: 'Shafin',
                    errorMessage: 'Page not found'
                })
            })




            // start server
            app.listen(port, () => {   ///port = 3000 for local host
                console.log('Server is up on port '+port)

            });