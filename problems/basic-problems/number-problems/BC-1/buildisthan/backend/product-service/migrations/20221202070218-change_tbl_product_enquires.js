'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_product_enquires', 'docket_id', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_enquires', 'user_name', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_enquires', 'request_id', {
      type: Sequelize.STRING(50),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_product_enquires', 'sku_id', {
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
