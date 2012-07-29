require('should');
global.sinon = require('sinon');
global.chai = require('chai');
global.expect = chai.expect;
global.sinonChai = require('sinon-chai');
chai.use(sinonChai);
