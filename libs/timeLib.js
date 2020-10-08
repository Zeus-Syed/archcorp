const moment = require('moment')
const momentz = require('moment-timezone')
const timeZone = 'Asia/Calcutta'

let now = () =>{
    return moment.utc().format()
}
 let getLocalTime = () => {
     return moment().tz(timeZone).format() 
 }

 let convertToLocalTime = (time) => {
     return momentz.tz(time, timeZone).format('LLLL')
 }

 module.exports = {
     now:now,
     getLocalTime: getLocalTime,
     convertToLocalTime: convertToLocalTime
 }