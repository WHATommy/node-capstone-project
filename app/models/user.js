let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

//define the schema for our user model
let userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    }
})

//method-----------------------------------------------------------

//generate a hash
userSchema.method.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//checking if password is valid
userSchema.method.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
};

//create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);