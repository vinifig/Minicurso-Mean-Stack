'use strict';

const config = function(cli){
  // Default config
  let data = {}
  data.port = cli.port ? cli.port : 27017;
  data.server = cli.server ? cli.server : 'localhost';
  data.dbname = cli.database ? cli.database : 'test';
  data.listen = cli.listen ? cli.listen: 8080;
  return data;
}

module.exports = config;
