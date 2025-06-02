'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_business_gst_masters', 'gst_number', {
      type: Sequelize.STRING(16),
      allowNull: true,
    }),
    await queryInterface.changeColumn('tbl_business_gst_masters', 'business_name', {
      type: Sequelize.STRING(120),
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
