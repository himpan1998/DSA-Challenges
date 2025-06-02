'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("tbl_category_masters", "sap_profit_center", {
      type: Sequelize.STRING,
      after:'category_name'
    })

    await queryInterface.addColumn("tbl_category_masters", "sap_storage_location", {
      type: Sequelize.STRING,
      after:"sap_profit_center"
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
