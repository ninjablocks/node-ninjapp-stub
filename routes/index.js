
exports.handleNinjaAuthentication = function(req,res,ninja) {
  req.session.ninja = ninja.data;
  req.session.token = ninja.token;
  res.redirect('/');
};

exports.index = function(req, res){
  res.render('index.jade',{
    title:'Node Ninja App Stubb',
    ninja:req.session.ninja
  });
};