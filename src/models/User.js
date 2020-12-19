const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true},
    password: { type: String, required: true}
})

UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    // Generate the salt

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // Hash the passsword using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            //Override the cleartext passwordd with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = model('User', UserSchema)
