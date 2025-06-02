'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      queryInterface.changeColumn(
        'tbl_product_change_logs',
         'created_by',
         {
          type:Sequelize.INTEGER,
          allowNull:false,
          after:'to_value'
         },
  
      )
      queryInterface.addColumn(
        'tbl_product_change_logs',
         'updated_by',
         {
          type:Sequelize.INTEGER,
          allowNull:true,
          after:'created_by'
         },
      )
      queryInterface.addColumn(
        'tbl_product_change_logs',
         'deleted_by',
         {
          type:Sequelize.INTEGER,
          allowNull:true,
          after:'updated_by'
         },
      )
      // queryInterface.renameTable('tbl_product_change_logs','tbl_product_logs_mappings')
 
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
