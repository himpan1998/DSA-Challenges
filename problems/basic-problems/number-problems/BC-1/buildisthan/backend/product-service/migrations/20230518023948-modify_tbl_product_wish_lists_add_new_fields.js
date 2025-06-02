'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_wish_lists',
       'is_active',
       {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        after:'isStatus'
       },

    )
    queryInterface.addColumn(
      'tbl_product_wish_lists',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_product_wish_lists',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_product_wish_lists',
       'deleted_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'updated_by'
       },
    )
    queryInterface.renameTable('tbl_product_wish_lists','tbl_product_wish_lists_masters')
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
