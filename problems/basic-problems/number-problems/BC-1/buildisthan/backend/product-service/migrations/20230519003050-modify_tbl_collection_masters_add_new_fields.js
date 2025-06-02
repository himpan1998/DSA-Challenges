'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'tbl_collection_masters',
      'is_active',
      {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1,
        after:'name'
      }
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
