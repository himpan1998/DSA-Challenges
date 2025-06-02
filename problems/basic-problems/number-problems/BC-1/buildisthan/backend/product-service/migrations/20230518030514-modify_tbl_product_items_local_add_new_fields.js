'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  // await queryInterface.removeConstraint('tbl_product_items_local','tbl_product_items_local_ibfk_2')
  //  await queryInterface.removeConstraint('tbl_product_items_local','tbl_product_items_local_ibfk_3')
  //  await queryInterface.removeConstraint('tbl_product_items_local','tbl_product_items_local_ibfk_4')

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
