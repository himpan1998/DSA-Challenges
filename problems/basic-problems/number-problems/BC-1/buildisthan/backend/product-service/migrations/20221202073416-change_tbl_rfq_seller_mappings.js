'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_rfq_seller_mappings', 'pre_order_id', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_rfq_seller_mappings', 'request_id', {
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
