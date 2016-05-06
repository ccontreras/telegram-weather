'use strict';

const TOKEN = "<ROBOT TOKEN>";

let tg = require('telegram-node-bot')(TOKEN);
let ow = require('./libs/openweather');
let _ = require('lodash');

tg.router
  .when(['/weather'], 'WeatherController');
    
tg.controller('WeatherController', ($) => {
    tg.for('/weather', ($) => {
        let args = _.capitalize($.args);
        ow.getWeather(args, (err, res) => {
            if (err) throw err;
            
            let json = JSON.parse(res);
            
            $.sendMessage(_.startCase(json.weather[0].main));
        });
    });
});