"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tbl_product_items",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tbl_category_masters',
            key: 'id'
          }
        },
        sub_categories_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tbl_sub_categories',
            key: 'id'
          }
        },
        brand_id:{
          type: Sequelize.INTEGER,
          references: {
            model: 'tbl_brand_masters',
            key: 'id'
          }
        },
        uom_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tbl_unit_of_measurements',
            key: 'id'
          }
        },
        product_name: {
          type: Sequelize.STRING,
          unique: {
            args: true,
            message: "product name must be unique.",
          },
        },
        short_description: {
          type: Sequelize.STRING,
        },
        full_description: {
          type: Sequelize.STRING,
        },
        sku: {
          type: Sequelize.STRING,
        },
        stock_quantity: {
          type: Sequelize.INTEGER,
        },
        original_price: {
          type: Sequelize.INTEGER,
        },
        offered_price: {
          type: Sequelize.INTEGER,
        },
        available_start_date: {
          type: Sequelize.STRING,
        },
        available_end_date: {
          type: Sequelize.STRING,
        },        
        is_active: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,

          allowNull: true,
        },
      },
      {
        paranoid: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_product_items");
  },
};
