'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  queryInterface.addColumn(
    'tbl_product_items', 
    'add_img_1', 
    {
      type: Sequelize.STRING,
      allowNull: true,
      after:'side_image_2' 
      
    },
  ),
  queryInterface.addColumn(
    'tbl_product_items',
    'add_img_2',
    {
      type: Sequelize.STRING,
      allowNull: true,
      after:'add_img_1' 
    },
  ),
 
  queryInterface.removeColumn('tbl_product_items','side_image_3')
  queryInterface.removeColumn('tbl_product_items','side_image_4')
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
