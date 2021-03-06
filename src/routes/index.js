var fs = require('fs');
var path = require('path');
module.exports = function (app,passport) {
  fs.readdirSync(__dirname).forEach(function(file) {
	  if (file !== "index.js" && path.extname(file) === '.js'){
	    //app.log.info('loading routes from ' + file);
	    require(path.join(__dirname, file))(app,passport);
	  }
	});

	app.get('*', function(req, res) {
		res.render('../public/index.html');
	});
};
