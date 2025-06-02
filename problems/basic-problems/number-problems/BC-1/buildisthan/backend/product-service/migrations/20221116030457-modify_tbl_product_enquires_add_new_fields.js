'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_enquires', 
      'docket_id', 
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    ),
    queryInterface.removeColumn('tbl_product_enquires','product_enquiry_docket_id')
    },
  async down (queryInterface, Sequelize) {
    // queryInterface.removeColumn('tbl_product_enquires','product_enquiry_docket_id')
  }
};
