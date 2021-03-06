const db = require('../models');
const passport = require('passport');
const config = require('../config/passport.js');



module.exports = (app, passport) => {

    /**
     * API route returns all todos through json response.
     */
    app.get('/api/contacts', (req, res) => {
      // console.log(req);
      db.models.findAll({}).then(function(modelPost){
        res.json(modelPost);

      });
    });

    app.get('/api/contacts/:id', (req, res) => {
      db.models.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(modelPost){
        res.json(modelPost);
      });
    });

     app.post("/api/contacts", function(req, res) {

     db.models.create({
       first_name   : req.body.first_name,
       last_name    : req.body.last_name,
       performer_first_name   : req.body.performer_first_name,
       performer_last_name    : req.body.performer_last_name,
       phone: req.body.phone,
       email: req.body.email,
       company: req.body.company,
       current_city: req.body.current_city,
       aff_code: req.body.aff_code,
       twitter: req.body.twitter,
       instagram: req.body.instagram,
      photo_url: req.body.photo_url,
      exclusive: req.body.exclusive
     })
       .then(function(modelPost) {
         res.redirect('/');
       });
   });

    /**
     * API route to update a todo.
     */
     app.put("/api/contacts/:id", function(req, res) {
       console.log(req.body);
     db.models.update({
       first_name   : req.body.first_name,
       last_name    : req.body.last_name,
       performer_first_name   : req.body.performer_first_name,
       performer_last_name    : req.body.performer_last_name,
       phone: req.body.phone,
       email: req.body.email,
       company: req.body.company,
       current_city: req.body.current_city,
       aff_code: req.body.aff_code,
       twitter: req.body.twitter,
       instagram: req.body.instagram,
       photo_url: req.body.photo_url,
       exclusive: req.body.exclusive
     }, {
       where: {
         id: req.params.id
       }
     })
       .then(function(modelPost) {
         res.redirect('/contacts')
       });
   });

    /**
     * API route to delete todo.
     */
     app.delete("/api/contacts/:id", function(req, res) {
       db.models.destroy({
         where: {
           id: req.params.id
         }
       })
         .then(function(modelPost) {
           res.redirect('/contacts');
         });
     });

};
