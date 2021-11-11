const mongoose = require('mongoose');

var Employee = mongoose.model('Employee',
{
name:{tyep:String},
position:{tyep:String},
office:{tyep:String},
salary:{tyep:Number}
}

);

module.exports = {Employee}; 
