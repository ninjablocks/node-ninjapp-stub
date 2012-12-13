var ninjaBlocks = require('ninja-blocks');

exports.handleNinjaAuthentication = function(req,res,ninja) {
  req.session.ninja = ninja.data;
  req.session.token = ninja.token;
  res.redirect('/');
};

exports.index = function(req, res){
  var ninja = ninjaBlocks.app({access_token:req.session.token});
  ninja.devices(function(err,devices) {
    res.render('index.jade',{
      title:'Node Ninja App Stubb',
      ninja:req.session.ninja,
      devices:devices
    });
  });
};