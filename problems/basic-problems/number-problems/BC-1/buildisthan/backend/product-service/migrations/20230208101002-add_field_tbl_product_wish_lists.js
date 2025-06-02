'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
    queryInterface.addColumn(
      'tbl_product_wish_lists', // table name
      'image_url', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'tbl_product_wish_lists', // table name
      'uom_symbol', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    )])
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
