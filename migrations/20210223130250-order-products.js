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
  return db.createTable("order_products", {
    id: {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      notNull: true,
    },
    
    order_id: {
      type: "int", 
      notNull: true,
      foreignKey: {
        name: 'order_products_order_id_pk',
        table: 'orders',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: {
          order_id: "id"
        }
      }
    },

    product_id: {
      type: "int", 
      notNull: true,
      foreignKey: {
        name: 'order_products_product_id_pk',
        table: 'products',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: {
          product_id: "id"
        }
      }
    },

    product_qty: "int"
  });
};

exports.down = function(db) {
    return db.dropTable("order_products");
};

exports._meta = {
  "version": 1
};
