'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_product_availability_based_on_blocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "tbl_category_masters",
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: "tbl_product_items",
          key: "id",
        },
      },
      block_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      is_active: {
        type: Sequelize.INTEGER,
        defaultValue:1
      },
      pincode: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_product_availability_based_on_blocks');
  }
};