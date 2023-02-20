const exp = require('constants');

let express = require('express'),
    app = express()


app


    .get('/', (req, res)=>{
        res.send('<h1>hello world </h1>');
    })

    .get('/contact', (req, res)=>{
        res.send('Contacto');
        })

    .listen(3000) 
        console.log('Server listening on port 3000')


    
