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
          ['first_name', 'ASC']
        ]
      }).then(function(modelPost){
          res.render('contacts', {
            contacts: modelPost,
            user: req.user
          });

          const user = req.user;
          console.log(user);

          const contacts = modelPost;
          console.log(modelPost);
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
