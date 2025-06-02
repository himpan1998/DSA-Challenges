'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_brand_masters', // table name
      'is_active', // new field name
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
