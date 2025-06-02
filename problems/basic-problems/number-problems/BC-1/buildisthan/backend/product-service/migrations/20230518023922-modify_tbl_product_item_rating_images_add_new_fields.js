'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_item_rating_images',
       'is_active',
       {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        after:'images_url'
       },

    )
    queryInterface.addColumn(
      'tbl_product_item_rating_images',
       'created_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'is_active'
       },

    )
    queryInterface.addColumn(
      'tbl_product_item_rating_images',
       'updated_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'created_by'
       },

    )
    queryInterface.addColumn(
      'tbl_product_item_rating_images',
       'deleted_by',
       {
        type:Sequelize.INTEGER,
        allowNull:false,
        after:'updated_by'
       },
    )
    queryInterface.renameTable('tbl_product_item_rating_images','tbl_product_rating_images_mappings')
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
