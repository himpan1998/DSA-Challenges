'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_rfq_seller_mappings',
       'is_active',
       {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        after:'is_confirmed_by_buyer'
       },

    )
    queryInterface.addColumn(
      'tbl_rfq_seller_mappings',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_rfq_seller_mappings',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_rfq_seller_mappings',
       'deleted_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
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
