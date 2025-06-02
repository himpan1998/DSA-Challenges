'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn("tbl_unit_of_measurements", "sap_mseh3", {
      type: Sequelize.STRING,
      after: "sap_msehi"
    })

  },

  async down(queryInterface, Sequelize) {

  }
};
