'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'tbl_product_items', // table name
      'front_image', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
        after:'sap_code' 
      },
    ),
   queryInterface.addColumn(
    'tbl_product_items', // table name
    'back_image', // new field name
    {
      type: Sequelize.STRING,
      allowNull: true,
      after:'front_image' 
      
    },
  ),
  queryInterface.addColumn(
    'tbl_product_items', // table name
    'side_image_1', // new field name
    {
      type: Sequelize.STRING,
      allowNull: true,
      after:'back_image' 
    },
  ),
  queryInterface.addColumn(
    'tbl_product_items', // table name
    'side_image_2', // new field name
    {
      type: Sequelize.STRING,
        allowNull: true,
        after:'side_image_1' 
      
    },
  ),
  queryInterface.addColumn(
    'tbl_product_items', // table name
    'add_img_1', // new field name
    {
      type: Sequelize.STRING,
      allowNull: true,
      after:'side_image_2' 
      
    },
  ),
  queryInterface.addColumn(
    'tbl_product_items', // table name
    'add_img_2', // new field name
    {
      type: Sequelize.STRING,
      allowNull: true,
      after:'add_img_1' 
    },
  ),
  queryInterface.addColumn(
    'tbl_product_items', // table name
    'sap_uom', // new field name
    {
      type: Sequelize.STRING,
      allowNull: true,
      after:'uom_id' 
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
