const db = require('../models');



module.exports = function(app){



  app.get('/', isLoggedIn, function(req, res, next) {
      res.render('index.hbs', {
        user: req.user
      }); // load the index.ejs file

      const user = req.user.first_name + " " + req.user.last_name;
      console.log(user);
       });


  app.get('/contacts', isLoggedIn, function(req, res) {
      db.models.findAll({
        order: [
          ['exclusive', 'ASC']
        ]
      }).then(function(modelPost){
          res.render('contacts', {
            contacts: modelPost,
            user: req.user
          });

        });
  });

  app.get('/table_view', isLoggedIn, function(req, res) {
      db.models.findAll({
        order: [
          ['exclusive', 'ASC']
        ]
      }).then(function(modelPost){
          res.render('table_view', {
            contacts: modelPost,
            user: req.user
          });

        });
  });

  app.get('/edit/:id', isLoggedIn, function(req, res){
    db.models.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(modelPost){
      res.render('edit', {
        contact: modelPost,
        user: req.user
      });
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
