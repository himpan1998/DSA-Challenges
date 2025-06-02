'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'tbl_sub_status_masters', // table name
      'web_api', // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:1
      },
    )
  },

  async down (queryInterface, Sequelize) {
     
  }
};
