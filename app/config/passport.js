// config/passport.js
// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
				  host     : 'mna97msstjnkkp7h.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
				  user     : 'vdiwb370hlbz8xv2',
				  password : 'uxe7739y1o70o5gm'
				});

connection.query('USE iqlrivn79i4fo7n1');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query("select * from users where id = "+id,function(err,rows){
			done(err, rows[0]);
		});
    });


 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
    //
    // passport.use('local-signup', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with email
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, email, password, done) {
    //
		// // find a user whose email is the same as the forms email
		// // we are checking to see if the user trying to login already exists
    //     connection.query("select * from users where email = '"+email+"'",function(err,rows){
		// 	console.log(rows);
		// 	console.log("above row object");
		// 	if (err)
    //             return done(err);
		// 	 if (rows.length) {
    //             return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
    //         } else {
    //
		// 		// if there is no user with that email
    //             // create the user
    //             var newUserMysql = new Object();
    //
		// 		newUserMysql.email    = email;
    //             newUserMysql.password = password; // use the generateHash function in our user model
    //
		// 		var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
		// 			console.log(insertQuery);
		// 		connection.query(insertQuery,function(err,rows){
		// 		newUserMysql.id = rows.insertId;
    //
		// 		return done(null, newUserMysql);
		// 		});
    //         }
		// });
    // }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

         connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);

		});



    }));

};
// // load all the things we need
// var LocalStrategy   = require('passport-local').Strategy;
//
// // load up the user model
// var User       		= require('../models/user');
//
// // expose this function to our app using module.exports
// module.exports = function(passport) {
//
// 	// =========================================================================
//     // passport session setup ==================================================
//     // =========================================================================
//     // required for persistent login sessions
//     // passport needs ability to serialize and unserialize users out of session
//
//     // used to serialize the user for the session
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//
//     });
//
//     // used to deserialize the user
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//
//         });
//     });
//
//
//     // =========================================================================
//     // LOCAL LOGIN =============================================================
//     // =========================================================================
//     // we are using named strategies since we have one for login and one for signup
//     // by default, if there was no name, it would just be called 'local'
//     passport.use('local-login', new LocalStrategy({
//            // by default, local strategy uses username and password, we will override with email
//            email : 'email',
//            password : 'password',
//            passReqToCallback : true // allows us to pass back the entire request to the callback
//        },
//        function(req, email, password, done) { // callback with email and password from our form
//          var isValidPassword = function(userpass, password) {
//
//              return bCrypt.compareSync(password, userpass);
//
//          }
//
//             connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
//    			if (err)
//                    return done(err);
//    			 if (!rows.length) {
//                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//                }
//
//    			// if the user is found but the password is wrong
//                if (!( rows[0].password == password))
//                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
//
//                // all is well, return successful user
//                return done(null, rows[0]);
//
//    		});
//
//
//     //
//     // passport.use('local-login', new LocalStrategy({
//     //     // by default, local strategy uses username and password, we will override with email
//     //     usernameField : 'email',
//     //     passwordField : 'password',
//     //     passReqToCallback : true // allows us to pass back the entire request to the callback
//     // },
//     // function(req, email, password, done) {
//     //
//     //
//     //     var isValidPassword = function(userpass, password) {
//     //
//     //         return bCrypt.compareSync(password, userpass);
//     //
//     //     }
//     //
//     //     console.log(email);
//     //
//     //     User.findOne({
//     //         where: {
//     //             email: email
//     //         }
//     //     }).then(function(user) {
//     //
//     //         if (!user) {
//     //
//     //             return done(null, false, {
//     //                 message: 'Email does not exist'
//     //             });
//     //
//     //         }
//     //
//     //         if (!isValidPassword(user.password, password)) {
//     //
//     //             return done(null, false, {
//     //                 message: 'Incorrect password.'
//     //             });
//     //
//     //         }
//     //
//     //
//     //         var userinfo = user.get();
//     //         return done(null, userinfo);
//     //         console.log(userinfo);
//     //
//     //
//     //     }).catch(function(err) {
//     //
//     //         console.log("Error:", err);
//     //
//     //         return done(null, false, {
//     //             message: 'Something went wrong with your Signin'
//     //         });
//     //
//     //     });
//     //
//     //
//     // }));
//
// };
