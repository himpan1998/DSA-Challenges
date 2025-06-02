'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.addColumn(
      'tbl_product_items', 
      'product_type', 
      {
        type: Sequelize.STRING,
        allowNull: true,
        comment:'Simple / Linked',
        defaultValue:'simple'
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', 
      'is_shown_in_home_page', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: '0 - No 1 - Yes',
        defaultValue:1
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', 
      'tax_category_id', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Pk fo Gst Master'
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', 
      'is_tax_exempted', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: '0 - No 1 - Yes',
        defaultValue:0
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', 
      'hsn_code', 
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:'N/A'
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', 
      'disable_buy_button', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: '0 - No 1 - Yes',
        defaultValue:0
      },
    ),
    queryInterface.addColumn(
      'tbl_product_items', 
      'bar_code', 
      {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Barcode of Product',
        defaultValue:'N/A'
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
