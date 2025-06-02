'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_temp_orders_masters',
         'is_active',
         {
          type:Sequelize.BOOLEAN,
          allowNull:false,
          after:'is_docket',
          defaultValue:1
         },
  
      )
      queryInterface.addColumn(
        'tbl_temp_orders_masters',
         'created_by',
         {
          type:Sequelize.INTEGER,
          allowNull:false,
          after:'is_active'
         },
  
      )
      queryInterface.addColumn(
        'tbl_temp_orders_masters',
         'updated_by',
         {
          type:Sequelize.INTEGER,
          allowNull:true,
          after:'created_by'
         },
      )
      queryInterface.addColumn(
        'tbl_temp_orders_masters',
         'deleted_by',
         {
          type:Sequelize.INTEGER,
          allowNull:true,
          after:'updated_by'
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
