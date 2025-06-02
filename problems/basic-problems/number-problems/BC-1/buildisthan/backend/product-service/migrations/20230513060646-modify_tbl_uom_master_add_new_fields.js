'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_unit_of_measurements',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_unit_of_measurements',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'created_by'
       },
    )
    queryInterface.renameTable('tbl_unit_of_measurements','tbl_uom_masters')
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
