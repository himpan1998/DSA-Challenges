'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_enquires',
       'is_active',
       {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        after:'comment'
       },

    )
    queryInterface.addColumn(
      'tbl_product_enquires',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_product_enquires',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'created_by'
       },
    )
    queryInterface.renameTable('tbl_product_enquires','tbl_product_enquiries_masters')
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
