const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
   email: { type: String, unique: true, lowercase: true },
   password: String 
});

// Before saving a model, run this function - a hook
userSchema.pre('save', function(next) {
    const user = this;

    // Generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }
        
        // Hash the password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }
    
            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;