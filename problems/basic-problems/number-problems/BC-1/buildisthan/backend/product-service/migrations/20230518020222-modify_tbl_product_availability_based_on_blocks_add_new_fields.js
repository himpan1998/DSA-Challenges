'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_availability_based_on_blocks',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_product_availability_based_on_blocks',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:true,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_product_availability_based_on_blocks',
       'deleted_by',
       {
        type:Sequelize.INTEGER,
        allowNull:true,
        after:'updated_by'
       },
    )
     queryInterface.renameTable('tbl_product_availability_based_on_blocks','tbl_product_block_mappings')
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
