'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_items', // table name
      'business_category', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "0- B2B, 1- B2C, 2- B2B & B2C"
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', // table name
      'sap_code', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', // table name
      'createdBy', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', // table name
      'updatedBy', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', // table name
      'deletedBy', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        
      },
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
