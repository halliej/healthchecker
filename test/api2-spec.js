const expect = require("chai").expect;
let api = require("../testlib/api2Test");
const timeout = 5000;

describe("API 2", function() {
	this.slow(300);
	this.timeout(timeout);
	//null api object after all test are run
	after => api = null;

	it("Healthcheck", function(done) {
		api.doHealthcheck(function(html, statusCode) {
			let myresponse = JSON.parse(html);
			let status = myresponse.status;
			expect(status, 'status').to.equal('success');
			expect(statusCode, 'status code').to.equal(200);
			done();
		});
	});
});