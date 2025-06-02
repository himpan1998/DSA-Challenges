'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tbl_specification_masters', 'name', {
      type: Sequelize.STRING(100),
      allowNull: true,
    }),
await queryInterface.changeColumn('tbl_specification_masters', 'type', {
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
