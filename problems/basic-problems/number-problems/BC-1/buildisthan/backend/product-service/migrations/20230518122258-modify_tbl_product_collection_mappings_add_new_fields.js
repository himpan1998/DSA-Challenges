'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_collection_mappings',
       'is_active',
       {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        after:'collection_id',
        defaultValue:1
        
       },

    )
    queryInterface.addColumn(
      'tbl_product_collection_mappings',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:true,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_product_collection_mappings',
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
