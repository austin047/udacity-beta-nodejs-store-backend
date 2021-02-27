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
  return db.createTable("products", {
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
    },
    price: {
      type: "decimal",
      notNull: true
    },
    category_id: { 
      type: "int", 
      foreignKey: {
        name: 'products_categories_id_fk',
        table: 'categories',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: {
          category_id: "id"
        }
      }
    }
  });
};

exports.down = function(db) {
  return db.dropTable("products");
};

exports._meta = {
  "version": 1
};
