'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable("orders", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      notNull: true,
    },
    user_id: {
      type: "int", 
      foreignKey: {
        name: 'orders_user_id_pk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          user_id: "id"
        }
      }
    },
    status: {
      type: 'string',
      notNull: true
    },
  });
};

exports.down = function(db) {
  return db.dropTable("orders");
};

exports._meta = {
  "version": 1
};
