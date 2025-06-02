'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_sub_categories_masters',
       'unique_code',
       {
        type:Sequelize.STRING,
        allowNull:true,
        unique:true
       },

    )
    queryInterface.addColumn(
      'tbl_sub_categories_masters',
       'unique_serial_code',
       {
        type:Sequelize.STRING,
        allowNull:true,
        unique:false
       },
    )
    queryInterface.addColumn(
      'tbl_sub_categories_masters',
       'level',
       {
        type:Sequelize.INTEGER,
        allowNull:true,
        unique:false
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
