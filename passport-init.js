/**
 * Created by Cengkuru on 8/29/2016.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport) {
   

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });



    passport.use('login', new LocalStrategy({
         // by default, local strategy uses username and password, we will override with email
            usernameField: 'email', //or email
            passwordField: 'password',

            passReqToCallback: true
        },
        function(req, email, password, done) {
            // check in mongo if a user with email exists or not
            User.findOne({ 'email': email },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with email ' + email);
                        return done(null, false);
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );
        }
    ));


    passport.use('local-signup', new LocalStrategy({

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email', //or email
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done) {

            // find a user in mongo with provided username
            User.findOne({ 'email': email }, function(err, user) {
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in SignUp: ' + err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with email: ' + email);
                    return done(null, false);
                } else {
                    // if there is no user, create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.email = email;
                    newUser.password = createHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log(newUser.email + ' Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        }));




    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
