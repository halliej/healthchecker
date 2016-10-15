const http = require("http");
const props = require("./testConf.json");
let options = props.api2;

module.exports = {
	doHealthcheck(callback) {
		//do the query
		http.get(options, function(res) {
			let body = "";
			res.setEncoding("UTF-8");

			res.on("data", function(chunk) {
				body += chunk;
			});

			res.on("end", function() {
				callback(body, res.statusCode);
			});
		});
	}
};