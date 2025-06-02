'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_status_masters', 
      'is_active',
      {
        type: Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:1
      },
    ),
    queryInterface.addColumn(
      'tbl_status_masters',
      'web_api',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:1
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
