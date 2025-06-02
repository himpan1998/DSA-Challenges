'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_product_items', 'product_name', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_items', 'sku', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_items', 'available_start_date', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_items', 'available_end_date', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_items', 'product_type', {
      type: Sequelize.STRING(70),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_items', 'hsn_code', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_items', 'bar_code', {
      type: Sequelize.STRING(100),
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
