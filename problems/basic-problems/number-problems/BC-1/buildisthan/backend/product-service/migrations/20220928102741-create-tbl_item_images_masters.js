"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tbl_item_images_masters",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },

        categories_id: {
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
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tbl_product_items',
            key: 'id'
          }
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
    await queryInterface.dropTable("tbl_item_images_masters");
  },
};
