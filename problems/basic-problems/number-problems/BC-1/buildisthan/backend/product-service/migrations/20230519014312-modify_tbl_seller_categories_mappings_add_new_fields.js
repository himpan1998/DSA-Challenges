'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'tbl_seller_categories_mappings',
         'is_active',
         {
          type:Sequelize.BOOLEAN,
          allowNull:false,
          after:'category_id',
          defaultValue:1
         },
  
      )
      queryInterface.changeColumn(
        'tbl_seller_categories_mappings',
         'created_by',
         {
          type:Sequelize.INTEGER,
          allowNull:false,
          after:'is_active'
         },
  
      )
      queryInterface.changeColumn(
        'tbl_seller_categories_mappings',
         'updated_by',
         {
          type:Sequelize.INTEGER,
          allowNull:true,
          after:'created_by'
         },
      )
      queryInterface.changeColumn(
        'tbl_seller_categories_mappings',
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
