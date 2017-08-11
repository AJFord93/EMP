const db = require('../models');




module.exports = (app) => {

    /**
     * API route returns all todos through json response.
     */
    app.get('/api/contacts', (req, res) => {
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
       phone: req.body.phone,
       email: req.body.email,
       current_city: req.body.current_city,
       aff_code: req.body.aff_code,
       twitter: req.body.twitter,
       instagram: req.body.instagram
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
       phone: req.body.phone,
       email: req.body.email,
       current_city: req.body.current_city,
       aff_code: req.body.aff_code,
       twitter: req.body.twitter,
       instagram: req.body.instagram
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
