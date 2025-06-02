'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_rfq_seller_mappings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rfq_id: {
        type: Sequelize.INTEGER,
        references: {  
          model: 'tbl_product_enquires',
          key: 'id'
        }
      },
      seller_id: {
        type: Sequelize.INTEGER,
      },
      admin_price: {
        type: Sequelize.FLOAT
      },
      seller_price: {
        type: Sequelize.FLOAT
      },
      remarks: {
        type: Sequelize.STRING
      },
      is_confirmed_by_buyer: {
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
    await queryInterface.dropTable('tbl_rfq_seller_mappings');
  }
};