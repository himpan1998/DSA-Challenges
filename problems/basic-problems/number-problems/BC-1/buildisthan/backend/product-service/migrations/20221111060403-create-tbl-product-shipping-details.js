'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_product_shipping_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {  
          model: 'tbl_product_items',
          key: 'id'
        }
      },
      is_shipping: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      width: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      is_free_shipping: {
        type: Sequelize.INTEGER
      },
      additional_shipping_charges: {
        type: Sequelize.INTEGER
      },
      averge_delivery_time: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('tbl_product_shipping_details');
  }
};