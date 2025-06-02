'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_business_gst_masters',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_business_gst_masters',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:true,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_business_gst_masters',
       'deleted_by',
       {
        type:Sequelize.INTEGER,
        allowNull:true,
        after:'updated_by'
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
