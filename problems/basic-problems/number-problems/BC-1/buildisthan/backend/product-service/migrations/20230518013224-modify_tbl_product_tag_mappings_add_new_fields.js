'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_tag_mappings',
       'is_active',
       {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        after:'tag_id'
       },

    )
    queryInterface.addColumn(
      'tbl_product_tag_mappings',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_product_tag_mappings',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_product_tag_mappings',
       'deleted_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
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
