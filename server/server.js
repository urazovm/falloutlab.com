var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {


  // start the web server
  return app.listen(function() {
    app.emit('started');

    function loadFixtures() {
        var perksModel = app.models.perks;

        perksModel.find({}, function (err, res) {
            if (res.length === 0) {
                var perksList = require('../fallout.converted.json');

                perksModel.upsert(perksList[0], function (err, res) {console.log(err, res)});

                perksList.map(function (item) {
                  perksModel.create(item, function (err, res) {console.log(res)});
                });

                console.log('Perks loaded');
                // load
            }
        })
    }

    // Need to import data after some delay as it needed to set up file persistance
    setTimeout(loadFixtures, 2000);

    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
