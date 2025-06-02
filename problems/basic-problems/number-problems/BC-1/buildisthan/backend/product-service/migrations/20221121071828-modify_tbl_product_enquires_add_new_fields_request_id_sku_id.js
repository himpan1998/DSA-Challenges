"use strict"
  module.exports = {
  async up(queryInterface, Sequelize) {
      queryInterface.addColumn(
        'tbl_product_enquires',
        'request_id', 
       
        {
          type: Sequelize.STRING,
          allowNull: false,
          
        },
      ),
      queryInterface.addColumn(
        'tbl_product_enquires',
        'sku_id',
        {
          type: Sequelize.STRING,
          allowNull: false,
          
        },
      )
  },
  async down(queryInterface, Sequelize) {
      queryInterface.removeColumn('tbl_product_enquires', 'docket_id')
  },
};

