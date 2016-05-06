'use strict';

const APIKEY = '<OPEN WEATHER APIKEY>';

let http = require('http');

module.exports.getWeather = (city, cb) => {
    let req = http.request({
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?q=' + encodeURIComponent(city) + '&APPID=' + APIKEY
    }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
           data += chunk; 
        });
        
        res.on('end', () => {
            cb(null, data);
        });
    });
    
    req.on('error', (err) => {
       cb(err); 
    });
    
    // send the request.
    req.end();
};