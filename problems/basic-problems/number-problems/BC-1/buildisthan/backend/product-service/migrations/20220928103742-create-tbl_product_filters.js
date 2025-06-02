"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tbl_product_filters",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tbl_product_items',
            key: 'id'
          }
        },
        items_alias: {
          type: Sequelize.STRING,
        },
        size: {
          type: Sequelize.STRING,
        },
        color: {
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
    await queryInterface.dropTable("tbl_product_filters");
  },
};
