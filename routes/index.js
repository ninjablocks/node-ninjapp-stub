var ninjaBlocks = require('ninja-blocks')
    , request = require('request');

exports.proxy = function(req,res) {

  if (!req.session.ninja) {
    res.json({error:'Unauthorised'},401);
    return;
  }

  var opts = {
      url:'https://api.ninja.is'+req.url,
      qs: { access_token:req.session.token },
      json:true
  };

  request(opts).pipe(res);
}

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