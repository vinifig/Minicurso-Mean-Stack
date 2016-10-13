'use strict';

// Package for APIs
const xablau = require('xablaujs');

// Package for cli config
const cli = require('commander');

// Users Schema
const UserSchema = require('./lib/schema/User');

// Server instance
const app = xablau.Server();


// Adding our User Schema
// xablau.structs.add(endpoint, Schema)
xablau.structs.add('user', UserSchema)

// Cli configs
cli.version('1.0.0')
  .option('-l, --listen [port]', "Set Server Port. Default: 8080")
  .option('-P, --port [port]', "Set Database Port. Default: 27017")
  .option('-h, --host [host]', "Set Database Host. Default: localhost")
  .option('-d, --database [database]', "Set Database Name: Default: test")
  // .option("-u, --user [user]", "Set Database Password: Default: none")
  // .option("-p, --password [password]", "Set Database User: Default: none")
  .parse(process.argv);

// Get Config from cli
const config = require('./lib/config')(cli);

// xablau.init(db_confs, server);
xablau.init(config, app);

// app.listen(port, callback)
app.listen(config.listen, () => {
  console.log(`Server listening on port ${config.listen}`);
})
