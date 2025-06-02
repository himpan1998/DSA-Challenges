'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    queryInterface.addColumn(
      'tbl_product_specification_mappings',
      'is_active',
      {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1,
        after:'values'
      }
    )
    queryInterface.addColumn(
      'tbl_product_specification_mappings',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_product_specification_mappings',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:true,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_product_specification_mappings',
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
