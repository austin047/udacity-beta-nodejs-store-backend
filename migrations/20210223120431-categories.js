'use strict';

var dbm;
var type;
var seed;
var Promise;


/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
 exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function (db) {
  return db.createTable("categories", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      notNull: true,
   },
    name: {
      type: "string",
      notNull: true
    }
  })
};

exports.down = function (db) {
  return db.dropTable("categories");
};

exports._meta = {
  version: 1
};


// "use strict";

// var dbm;
// var type;
// var seed;
// var fs = require("fs");
// var path = require("path");
// var Promise;

// /**
//  * We receive the dbmigrate dependency from dbmigrate initially.
//  * This enables us to not have to rely on NODE_PATH.
//  */
// exports.setup = function (options, seedLink) {
//   dbm = options.dbmigrate;
//   type = dbm.dataType;
//   seed = seedLink;
//   Promise = options.Promise;
// };

// exports.up = function (db) {
//   return db.createTable("categories", {
//     id: {
//       type: "int",
//       primaryKey: true,
//       autoIncrement: true,
//       unique: true,
//       notNull: true,
//     },
//     name: "string",
//     notes: "string",
//   });
// };

// exports.down = function (db) {
//   return db.dropTable("categories");
// };

// exports._meta = {
//   version: 1,
// };
