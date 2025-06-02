'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_unit_of_measurements', 'name', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_unit_of_measurements', 'symbol', {
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
