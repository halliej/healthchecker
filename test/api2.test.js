const axios = require('axios');
const expect = require('expect');
const describe = require('mocha').describe;
const it = require('mocha').it;

const props = require('./config.json');

const options = props.api2;

let url = `http://${options.host}`;
url += (`${options.port}`) ? `:${options.port}${options.path}` : `${options.path}`;

describe('API 2', () => {
  it('Healthcheck', (done) => {
    axios({
      method: 'get',
      url
    }).then((response) => {
      expect(response.status).toBe(200);
      done();
    }).catch((e) => { done(e); });
  });
});
