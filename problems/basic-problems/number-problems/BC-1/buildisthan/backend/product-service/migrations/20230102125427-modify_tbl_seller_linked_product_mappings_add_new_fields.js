'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_seller_linked_product_mappings',
      'is_out_of_stock',
      {
          type: Sequelize.BOOLEAN,
          allowNull: false,
      },
      {
        paranoid: true,
      }
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
