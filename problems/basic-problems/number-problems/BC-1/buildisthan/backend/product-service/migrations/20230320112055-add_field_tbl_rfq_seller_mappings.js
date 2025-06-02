'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_rfq_seller_mappings', // table name
      'logistic_charges', // new field name
      {
        type: Sequelize.INTEGER
      },
    ),
queryInterface.addColumn(
      'tbl_rfq_seller_mappings', // table name
      'commission', // new field name
      {
        type: Sequelize.INTEGER
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
