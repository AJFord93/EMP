const db = require('../models');



module.exports = function(app){



  app.get('/', isLoggedIn, function(req, res) {
      res.render('index.hbs'); // load the index.ejs file
       });


  app.get('/contacts', isLoggedIn, function(req, res) {
      db.models.findAll({}).then(function(modelPost){
          res.render('contacts', {contacts: modelPost});
        });
  });

  app.get('/edit/:id', isLoggedIn, function(req, res){
    db.models.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(modelPost){
      res.render('edit', {contact: modelPost});
    });
  });

  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/signin');
  }

};
