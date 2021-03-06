/*
 * config.js: Configuration information for your Rackspace Cloud account
 *
 * (C) 2010 Nodejitsu Inc.
 * MIT LICENSE
 *
 */

var fs = require('fs'),
    path = require('path');

var defaultAuthHost = 'auth.api.rackspacecloud.com';

//
// function createConfig (defaults) 
//   Creates a new instance of the configuration 
//   object based on default values
//
exports.createConfig = function (options) {
  return new Config(options);
};

//
// Config (defaults) 
//   Constructor for the Config object
//
var Config = exports.Config = function (options) {
  if (!options.auth) throw new Error ('options.auth is required to create Config');

  this.auth = {
    username: options.auth.username,
    apiKey: options.auth.apiKey,
    host: options.auth.host || defaultAuthHost
  };

  
  if (options.cdn) {
    this.cdn.ttl = options.cdn.ttl || this.cdn.ttl;
    this.logRetention = options.cdn.logRetention || this.cdn.logRetention;
  }

  if (options.servicenet) {
    this.servicenet = true;
  } else {
    this.servicenet = false;
  }
  
  var cachePath = path.join(this.cache.path, this.auth.username);
  this.cache.path = options.cache ? options.cache.cachePath || cachePath : cachePath;
};
 
Config.prototype = {
  cdn: {
    ttl: 43200,        // Default X-TTL time-out to 12 hours,
    logRetention: true // Default X-LOG-RETENTION to true 
  },
  cache: {
    path: path.join(__dirname, '..', '..', '.cache')
  }
};


