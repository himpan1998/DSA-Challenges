'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 

    queryInterface.addColumn(
      'tbl_product_item_ratings',
      'user_name',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }       
    )
    ,
    queryInterface.addColumn(
      'tbl_product_item_ratings',
      'title',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }       
    ),
    queryInterface.addColumn(
      'tbl_product_item_ratings',
      'description',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }       
    ),
    queryInterface.addColumn(
      'tbl_product_item_ratings',
      'images_url_id',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }       
    ),
    queryInterface.addColumn(
      'tbl_product_item_ratings',
      'is_verify',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }       
    )         
  }, 

  async down (queryInterface, Sequelize) {
     // logic for reverting the changes
     return  [
      queryInterface.removeColumn('tbl_product_item_ratings', 'user_name'),
      queryInterface.removeColumn('tbl_product_item_ratings', 'title'),
      queryInterface.removeColumn('tbl_product_item_ratings', 'images_url_id'),
      queryInterface.removeColumn('tbl_product_item_ratings', 'is_verify')
     ]

      
  }
};
