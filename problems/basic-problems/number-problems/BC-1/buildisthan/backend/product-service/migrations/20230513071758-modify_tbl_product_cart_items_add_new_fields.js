'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_cart_items',
       'is_active',
       {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        after:'status'
       },

    )
    queryInterface.addColumn(
      'tbl_product_cart_items',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_product_cart_items',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'created_by'
       },
    )
    queryInterface.renameTable('tbl_product_cart_items','tbl_product_cart_masters')
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
