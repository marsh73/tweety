var appRouter = function(app, tw) {

  app.get("/account", function(req, res) {
    var accountMock = {
      "username": "nraboy",
      "password": "1234",
      "twitter": "@nraboy"
    }
    if(!req.query.username) {
      return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
      return res.send({"status": "error", "message": "wrong username"});
    } else {
      return res.send(accountMock);
    }
  });

  app.get("/tweets", function(req, res) {
    var screenName = req.screenName ? req.screenName : 'the_real_marsh';
    var count = req.count ? req.count : 5;
   var params = {screen_name: screenName, count: count};
   tw.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      return res.send(tweets);
    } else {
      console.log(error);
    }
  });
 });
}

module.exports = appRouter;
