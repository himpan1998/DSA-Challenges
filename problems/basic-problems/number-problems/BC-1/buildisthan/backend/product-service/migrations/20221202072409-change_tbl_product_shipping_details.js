'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_product_shipping_details', 'weight', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_shipping_details', 'length', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_shipping_details', 'width', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),

await queryInterface.changeColumn('tbl_product_shipping_details', 'height', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_shipping_details', 'averge_delivery_time', {
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
