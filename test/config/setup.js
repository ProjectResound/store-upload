require("jsdom-global")();
var Dotenv = require("dotenv-webpack");
var envEntries = (new Dotenv({ path: "./test/config/.env.test" })).definitions;
var envProps = Object.keys(envEntries).reduce(function(acc, prop) {
  var propName = (prop.split('.'))[2];
  var propValue = envEntries[prop].replace(/\"/g, "");
  acc[propName] = propValue;

  return acc;
}, {});
console.log(envProps);
global.process.env = envProps;

