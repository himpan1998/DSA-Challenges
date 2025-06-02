'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_shipping_details',
         'is_active',
         {
          type:Sequelize.BOOLEAN,
          allowNull:false,
          after:'averge_delivery_time',
          defaultValue:1
         },
  
      )
      queryInterface.addColumn(
        'tbl_product_shipping_details',
         'created_by',
         {
          type:Sequelize.INTEGER,
          allowNull:false,
          after:'is_active'
         },
  
      )
      queryInterface.addColumn(
        'tbl_product_shipping_details',
         'updated_by',
         {
          type:Sequelize.INTEGER,
          allowNull:true,
          after:'created_by'
         },
      )
      queryInterface.addColumn(
        'tbl_product_shipping_details',
         'deleted_by',
         {
          type:Sequelize.INTEGER,
          allowNull:true,
          after:'updated_by'
         },
      )
      queryInterface.renameTable('tbl_product_shipping_details','tbl_product_shipping_masters')
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
