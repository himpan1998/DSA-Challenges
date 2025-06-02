"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "tbl_product_enquires",
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
            model: "tbl_product_items",
            key: "id",
          },
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "tbl_category_masters",
            key: "id",
          },
        },
          order_quantity: {
            type: Sequelize.INTEGER,
          },
          price: {
            type: Sequelize.FLOAT,
          },
          comment: {
            type: Sequelize.STRING,
          },
          state: {
            type: Sequelize.STRING,
          },
          city: {
            type: Sequelize.STRING,
          },
          address: {
            type: Sequelize.STRING,
          },
          pincode: {
            type: Sequelize.STRING,
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
    await queryInterface.dropTable("tbl_product_enquires");
  },
};
