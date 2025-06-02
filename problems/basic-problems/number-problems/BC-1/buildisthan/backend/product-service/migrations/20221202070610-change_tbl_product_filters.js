'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_product_filters', 'size', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_filters', 'color', {
      type: Sequelize.STRING(50),
      allowNull: true,
    })
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
