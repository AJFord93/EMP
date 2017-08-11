const db = require('../models');



module.exports = function(app){

  app.get('/', function(req, res){
    res.render('index', {});
  });

  app.get('/login', function(req, res){
    res.render('login', {});
  });

  app.get('/contacts', function(req, res) {
      db.models.findAll({}).then(function(modelPost){
          res.render('contacts', {contacts: modelPost});
        });
  });

  app.get('/edit/:id', function(req, res){
    db.models.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(modelPost){
      res.render('edit', {contact: modelPost});
    });
  });

  app.get('/package', function(req, res) {

          res.render('package', {});
        });


};
