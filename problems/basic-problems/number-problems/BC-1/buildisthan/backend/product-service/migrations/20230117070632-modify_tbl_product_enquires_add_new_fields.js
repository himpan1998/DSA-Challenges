'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_enquires', 
      'business_gst_id',
      {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
    ),
    queryInterface.addColumn(
      'tbl_product_enquires',
      'uom_id',
      {
        type: Sequelize.INTEGER,
        allowNull:true,
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
